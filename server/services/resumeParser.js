export const basicParse = (text) => {

    const result = {
        name: null,
        email: null,
        phone: null,
        skills: [],
        education: [],
        experience: [],
        summary: null
    };

    //NAME
    const nameMatch = text.match(
        /^[A-Z][a-z]+(?:\s[A-Z]\.)?(?:\s[A-Z][a-z]+)+/m
    );

    if (nameMatch) result.name = nameMatch[0].trim();

    // EMAIL
    const emailMatch = text.match(
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
    );
    if (emailMatch) result.email = emailMatch[0];

    // PHONE
    const phoneMatch = text.match(
        /(\+?\d{1,3}[-.\s]?)?\d{10}/
    );
    if (phoneMatch) result.phone = phoneMatch[0];

    const lowerText = text.toLowerCase();

    // SKILLS DETECTION (GLOBAL SEARCH)
    const skillDictionary = [
        "javascript", "typescript", "react", "node", "nodejs", "express",
        "mongodb", "mysql", "postgresql", "html", "css", "tailwind", "n8n", "AI", "Automation",
        "python", "java", "c++", "c#", "git", "github", "Docker", "AWS", "API", "REST", "GraphQL",
        "aws", "docker", "kubernetes", "redux", "nextjs", "js", "django", "sql"
    ];

    result.skills = skillDictionary.filter(skill =>
        lowerText.includes(skill)
    );

    // EDUCATION DETECTION (GLOBAL SEARCH)
    const degreePatterns = [
        /b\.?tech/gi,
        /bachelor[^,\n]*/gi,
        /b\.?sc/gi,
        /m\.?tech/gi,
        /master[^,\n]*/gi,
        /mba/gi,
        /phd/gi
    ];

    const educationMatches = [];

    degreePatterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) {
            matches.forEach(m => educationMatches.push(m.trim()));
        }
    });

    result.education = [...new Set(educationMatches)];

    // EXPERIENCE DETECTION
    const experienceMatches = text.match(
        /\b(20\d{2})\b.*?\b(20\d{2}|present)\b/gi
    );

    if (experienceMatches) {
        result.experience = experienceMatches;
    }

    return result;
};