
/**
 * Parses a task string to extract date and priority.
 * Example: "Finish report tomorrow !p1 #work"
 * Returns: { title: "Finish report #work", priority: "p1", dueDate: Date object }
 */
export const smartParse = (text) => {
    let title = text;
    let priority = 'p4'; // Default
    let dueDate = null;

    // 1. Detect Priority (!p1, !p2, !urgent, !high)
    if (text.match(/!p1|!urgent/i)) priority = 'p1';
    else if (text.match(/!p2|!high/i)) priority = 'p2';
    else if (text.match(/!p3|!medium/i)) priority = 'p3';

    // Remove priority flag from title
    title = title.replace(/!(p[1-4]|urgent|high|medium)/gi, '').trim();

    // 2. Detect Date (tomorrow, today, next week)
    const now = new Date();
    const lowerText = text.toLowerCase();

    if (lowerText.includes('tomorrow')) {
        dueDate = new Date(now);
        dueDate.setDate(now.getDate() + 1);
        dueDate.setHours(9, 0, 0, 0); // Default to 9am
        title = title.replace(/tomorrow/gi, '');
    } else if (lowerText.includes('today') || lowerText.includes('tonight')) {
        dueDate = new Date(now);
        dueDate.setHours(18, 0, 0, 0); // Default to 6pm
        title = title.replace(/today|tonight/gi, '');
    } else if (lowerText.includes('next week')) {
        dueDate = new Date(now);
        dueDate.setDate(now.getDate() + 7);
        title = title.replace(/next week/gi, '');
    }

    // Cleanup extra spaces
    title = title.replace(/\s+/g, ' ').trim();

    return { title, priority, dueDate };
}
