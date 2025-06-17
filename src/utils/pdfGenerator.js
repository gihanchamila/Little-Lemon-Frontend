import jsPDF from "jspdf";
import { date } from "yup";

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
 * @param {string} data.occasion
 */
export const generatePDF = ({
  booking_datetime,
  number_of_guests,
  special_request,
  first_name,
  last_name,
  email,
  total_price,
  occasion,
}) => {
  const doc = new jsPDF();
    console.log(occasion)

    const getDate = (datetime) => {
        const splitDate = datetime.split("T");
        let time = splitDate[1].replace("Z", ""); // e.g. "18:00:00"
        // Remove the trailing ":00" seconds part
        time = time.endsWith(":00") ? time.slice(0, -3) : time;
        
        return {
            date: splitDate[0],
            time: time
        };
    };

    const { date, time } = getDate(booking_datetime);

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
  doc.text(`Date: ${date}`, 20, 75);
  doc.text(`Time: ${time}`, 20, 82);
  doc.text(`Guests: ${number_of_guests}`, 20, 89);
  doc.text(`Occasion: ${occasion}`, 20, 96);

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
