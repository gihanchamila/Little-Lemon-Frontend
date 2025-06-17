import jsPDF from "jspdf";

/**
 * Generates a beautifully designed, professional PDF reservation confirmation
 * for the Little Lemon restaurant.
 *
 * @param {Object} data - The reservation and customer data.
 * @param {string} data.booking_datetime
 * @param {number|string} data.number_of_guests
 * @param {string} data.special_request
 * @param {string} data.first_name
 * @param {string} data.last_name
 * @param {string} data.email
 * @param {number|string} data.total_price
 * @param {string} data.occasion - The name of the occasion.
 * @param {string} data.seatingName - The name of the seating type.
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
  seatingName,
}) => {
  const doc = new jsPDF();
  
  // Define Colors and Margins
  const PRIMARY_COLOR = '#495E57'; // Dark Green
  const ACCENT_COLOR = '#F4CE14';  // Lemon Yellow
  const TEXT_COLOR = '#333333';
  const LIGHT_GRAY = '#F7F7F7';
  const PAGE_MARGIN = 15;
  const PAGE_WIDTH = doc.internal.pageSize.getWidth();

  let yPos = 0; // Vertical position tracker

  // --- 1. Header Section ---
  doc.setFillColor(PRIMARY_COLOR);
  doc.rect(0, 0, PAGE_WIDTH, 35, 'F'); // Header background

  // Simple circle "logo"
  doc.setFillColor(ACCENT_COLOR);
  doc.circle(PAGE_MARGIN + 8, 17, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.text("LL", PAGE_MARGIN + 5, 19);

  // Restaurant Name
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#FFFFFF');
  doc.text("Little Lemon", PAGE_MARGIN + 20, 20);
  
  // Reset font
  doc.setFont('helvetica', 'normal');
  yPos = 50;

  // --- 2. Confirmation Title ---
  doc.setFontSize(18);
  doc.setTextColor(TEXT_COLOR);
  doc.text("Reservation Confirmation", PAGE_WIDTH / 2, yPos, { align: 'center' });
  yPos += 10;
  
  doc.setDrawColor(LIGHT_GRAY);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN, yPos, PAGE_WIDTH - PAGE_MARGIN, yPos);
  yPos += 15;

  // --- 3. Details Section (Two Columns) ---
  const leftColX = PAGE_MARGIN;
  const rightColX = PAGE_WIDTH / 2 + 10;
  const initialDetailsY = yPos;

  // Left Column: Customer Info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(PRIMARY_COLOR);
  doc.text("CUSTOMER DETAILS", leftColX, yPos);
  yPos += 7;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(TEXT_COLOR);
  doc.text(`Name: ${first_name} ${last_name}`, leftColX, yPos);
  yPos += 7;
  doc.text(`Email: ${email}`, leftColX, yPos);
  
  // Right Column: Reservation Info
  yPos = initialDetailsY; // Reset Y for the second column
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(PRIMARY_COLOR);
  doc.text("RESERVATION DETAILS", rightColX, yPos);
  yPos += 7;

  const getDate = (datetime) => {
    const dateObj = new Date(datetime.replace(/:(\d{2})$/, '.$1'));
    const dateStr = dateObj.toISOString().split('T')[0];
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return { date: dateStr, time: timeStr };
  };
  const { date, time } = getDate(booking_datetime);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(TEXT_COLOR);
  doc.text(`Date: ${date}`, rightColX, yPos);
  yPos += 7;
  doc.text(`Time: ${time}`, rightColX, yPos);
  yPos += 7;
  doc.text(`Guests: ${number_of_guests}`, rightColX, yPos);
  yPos += 7;
  doc.text(`Seating: ${seatingName}`, rightColX, yPos);
  yPos += 7;
  doc.text(`Occasion: ${occasion}`, rightColX, yPos);
  
  // --- 4. Special Request Section ---
  yPos += 15; // Add space before the next section
  if (special_request) {
    doc.setLineWidth(0.5);
    doc.line(PAGE_MARGIN, yPos - 5, PAGE_WIDTH - PAGE_MARGIN, yPos - 5);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(PRIMARY_COLOR);
    doc.text("SPECIAL REQUEST", PAGE_MARGIN, yPos);
    yPos += 8;

    doc.setFillColor(LIGHT_GRAY);
    doc.setDrawColor(LIGHT_GRAY);
    // Use splitTextToSize to calculate box height
    const requestLines = doc.splitTextToSize(special_request, PAGE_WIDTH - (PAGE_MARGIN * 2) - 4);
    const boxHeight = requestLines.length * 5 + 6;
    doc.rect(PAGE_MARGIN, yPos - 4, PAGE_WIDTH - (PAGE_MARGIN * 2), boxHeight, 'F');
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(TEXT_COLOR);
    doc.text(special_request, PAGE_MARGIN + 2, yPos, { maxWidth: PAGE_WIDTH - (PAGE_MARGIN * 2) - 4 });
    yPos += boxHeight + 5;
  }
  
  // --- 5. Total Price Section ---
  yPos = special_request ? yPos : yPos + 10; // Adjust spacing if no request
  doc.setDrawColor(PRIMARY_COLOR);
  doc.setLineWidth(0.8);
  doc.line(PAGE_MARGIN, yPos, PAGE_WIDTH - PAGE_MARGIN, yPos);
  yPos += 10;

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("Total", PAGE_MARGIN, yPos);
  doc.text(`$${parseFloat(total_price).toFixed(2)}`, PAGE_WIDTH - PAGE_MARGIN, yPos, { align: 'right' });
  yPos += 10;
  
  // --- 6. Footer Section ---
  const pageHeight = doc.internal.pageSize.getHeight();
  yPos = pageHeight - 45;

  doc.setDrawColor(LIGHT_GRAY);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN, yPos, PAGE_WIDTH - PAGE_MARGIN, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(PRIMARY_COLOR);
  doc.text("Thank you for choosing Little Lemon!", PAGE_WIDTH / 2, yPos, { align: 'center' });
  yPos += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(TEXT_COLOR);
  doc.text("123 Lemon Grove, Chicago, IL | (312) 555-0198 | contact@littlelemon.com", PAGE_WIDTH / 2, yPos, { align: 'center' });
  yPos += 12;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor('#888888');
  const footerText = "This is a reservation confirmation, not a final bill. Payment will be settled at the restaurant.\nFor details on how we use your data, please see our Privacy Policy at littlelemon.com/privacy. By dining with us, you agree to our Terms & Conditions at littlelemon.com/terms.";
  doc.text(footerText, PAGE_WIDTH / 2, yPos, { align: 'center', maxWidth: PAGE_WIDTH - (PAGE_MARGIN * 2) });
  
  // --- 7. Save the PDF ---
  doc.save("LittleLemon_Reservation.pdf");
};