export const createSriLankaIsoDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;

    const [year, month, day] = dateStr.split("-");
    const [hours, minutes] = timeStr.split(":");

    // Create Date object in local Sri Lankan time
    const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours) - 5,
        Number(minutes) - 30
    );


    return date
};
