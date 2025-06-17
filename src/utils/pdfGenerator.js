import jsPDF from "jspdf";

/**
 * Generates a beautifully formatted PDF reservation bill.
 * 
 * @param {Object} data - Reservation details
 * @param {string} data.booking_datetime - Full ISO datetime string
 * @param {number} data.number_of_guests
 * @param {number} data.seating_type_id
 * @param {number} data.occasion_id
 * @param {string} data.special_request
 * @param {string} data.first_name
 * @param {string} data.last_name
 * @param {string} data.email
 * @param {number|string} data.total_price
 * @param {Array} data.occasionsList - List of occasions from API
 * @param {Array} data.seatingTypesList - List of seating types from API
 */
export const generatePDF = ({
  booking_datetime,
  number_of_guests,
  seating_type_id,
  occasion_id,
  special_request,
  first_name,
  last_name,
  email,
  total_price,
  occasionsList = [],
  seatingTypesList = [],
}) => {
  const doc = new jsPDF();

  // Format readable date and time
  const dateObj = new Date(booking_datetime);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Get names from lists
  const selectedOccasionName =
    occasionsList.find(item => item.id === parseInt(occasion_id))?.name || "Unknown";

  const selectedSeatingName =
    seatingTypesList.find(item => item.id === parseInt(seating_type_id))?.name || "Unknown";

  // Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Reservation Receipt", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setDrawColor(150);
  doc.line(20, 25, 190, 25); // horizontal divider

  // Customer Info
  doc.text("Customer Information", 20, 35);
  doc.text(`Name: ${first_name} ${last_name}`, 20, 45);
  doc.text(`Email: ${email}`, 20, 52);

  // Reservation Info
  doc.text("Reservation Details", 20, 65);
  doc.text(`Date: ${formattedDate}`, 20, 75);
  doc.text(`Time: ${formattedTime}`, 20, 82);
  doc.text(`Guests: ${number_of_guests}`, 20, 89);
  doc.text(`Occasion: ${selectedOccasionName}`, 20, 96);
  doc.text(`Seating: ${selectedSeatingName}`, 20, 103);
  if (special_request) {
    doc.text("Special Request:", 20, 110);
    doc.setFont("helvetica", "italic");
    doc.text(special_request, 20, 117, { maxWidth: 170 });
    doc.setFont("helvetica", "normal");
  }

  // Total Price
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: $${parseFloat(total_price).toFixed(2)}`, 190, 135, { align: "right" });

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for choosing us!", 105, 150, { align: "center" });

  doc.save("Reservation_Bill.pdf");
};
