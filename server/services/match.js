export const calculateMatchScore = (resumeSkills, jobSkills) => {
    if (!resumeSkills?.length || !jobSkills?.length) return 0;

    // Normalize skills (lowercase, trim)
    const normalizedResumeSkills = resumeSkills.map(skill =>
        skill.toLowerCase().trim()
    );

    const normalizedJobSkills = jobSkills.map(skill =>
        skill.toLowerCase().trim()
    );

    // Find matching skills
    const matchingSkills = normalizedJobSkills.filter(skill =>
        normalizedResumeSkills.includes(skill)
    );
    const missingSkills = normalizedJobSkills.filter(
        skill => !normalizedResumeSkills.includes(skill)
    );

    const score =
        (matchingSkills.length / normalizedJobSkills.length) * 100;

    return {
        score: Math.round(score),
        matchingSkills,
        totalJobSkills: normalizedJobSkills.length,
        missingSkills,
    };
};