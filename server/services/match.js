export const calculateMatchScore = (resumeSkills = [], jobSkills = []) => {

    if (!resumeSkills.length || !jobSkills.length) {
        return {
            score: 0,
            matchingSkills: [],
            missingSkills: [],
            totalJobSkills: 0
        };
    }
    // Normalize skills (lowercase, trim)
    const normalizedResumeSkills = resumeSkills.map(skill =>
        skill.toLowerCase().trim()
    );

    const normalizedJobSkills = jobSkills.map(skill =>
        skill.toLowerCase().trim()
    );
    // Find matching skills
    const matchingSkills = [...new Set(
        normalizedJobSkills.filter(jobSkill =>
            normalizedResumeSkills.some(resumeSkill =>
                resumeSkill.includes(jobSkill) || jobSkill.includes(resumeSkill)
            )
        )
    )];

    const missingSkills = normalizedJobSkills.filter(
        skill => !matchingSkills.includes(skill)
    );

    const score = Math.round(
        (matchingSkills.length / normalizedJobSkills.length) * 100
    );

    return {
        score,
        matchingSkills,
        missingSkills,
        totalJobSkills: normalizedJobSkills.length
    };
};