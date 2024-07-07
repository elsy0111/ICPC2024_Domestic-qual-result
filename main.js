document.addEventListener("DOMContentLoaded", function () {
    const teams = document.querySelectorAll('.team-row');
    const selectedTeams = [];
    const universityCount = {};
    
    const host_univ = 'TokyoInstituteofTechnology';
    let host_univ_selected = false;

    teams.forEach((team, index) => {
        let university = team.querySelector('.team-name small span').textContent.trim();
        university = university.replace(/\s+/g, ''); // Remove all whitespace and empty lines
        university = university.replace(/\[\d+\/\d+\]/g, ''); // Remove patterns like [数字/数字]
        const selectedCount = selectedTeams.length;
        const universitySelectedCount = universityCount[university] || 0;

        let isSelected = true;
        let cause = 'Accepted';

        if (selectedCount >= 10) {
            if (selectedCount < 25) {
                if (universitySelectedCount >= 3) {
                    isSelected = false;
                    cause = 'Rejected : Univ. teams > 3 selected (rule1-2)';
                }
            } else if (selectedCount < 40) {
                if (universitySelectedCount >= 2) {
                    isSelected = false;
                    cause = 'Rejected : Univ. teams > 2 selected (rule1-3)';
                }
            } else if (selectedCount < 49) {
                if (universitySelectedCount >= 1) {
                    isSelected = false;
                    cause = 'Rejected : Univ. teams > 1 selected (rule1-4)';
                }
            } else if (selectedCount >= 49) {
                isSelected = false;
                cause = 'Rejected cause: Maximum teams = 49 selected';   
            }
            if (isSelected === false && host_univ_selected === false && university === host_univ){
                host_univ_selected = true;
                isSelected = true;
                cause = 'Accepted : Host university (rule2)';
            }
        }

        const statusElement = document.createElement('div');
        statusElement.className = 'status';
        statusElement.textContent = `${cause}`; // Add selected count
        team.appendChild(statusElement);

        if (isSelected) {
            selectedTeams.push(team);
            universityCount[university] = (universityCount[university] || 0) + 1;
            team.style.backgroundColor = '#ccffcc'; // lighter green
            statusElement.textContent = `${cause} (${selectedCount + 1})`; // Add  standings
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const scoreElements = document.querySelectorAll('.team-right .team-col.team-score');

    scoreElements.forEach(scoreElement => {
        const bgElement = scoreElement.querySelector('.team-colored-col-bg');
        const fgElement = scoreElement.querySelector('.team-colored-col-fg');

        if (bgElement && fgElement) {
            const bgColor = window.getComputedStyle(bgElement).backgroundColor;
            fgElement.style.backgroundColor = bgColor;
        }
    });
    const bgElements = document.querySelectorAll('.team-right .team-col.team-score .team-colored-col-bg');

    bgElements.forEach(bgElement => {
        bgElement.remove();
    });

    const tlElements = document.querySelectorAll('.team-left');

    tlElements.forEach(tlElement => {
        tlElement.remove();
    });
});
