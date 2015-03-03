GRADE_CUTOFFS = [
    ('A+', 97),
    ('A', 87),
    ('A-', 80),
    ('B+', 70),
    ('B', 50),
    ('B-', 35),
    ('C+', 20),
    ('C', 0)
]
#
def has_met_rank_prerequisites(user):
    return not (user.profile_url and
        user.guru_introduction and
        user.guru_courses and
        user.majors and
        user.email
        )


def calculate_guru_score(user):
    guru_score = 0

    if not has_met_rank_prerequisites(user):
        return guru_score

    guru_score = 20

    for key in GURU_SCORE_OPPORTUNITIES:
        func = GURU_SCORE_OPPORTUNITIES[key]['function']
        points = GURU_SCORE_OPPORTUNITIES[key]['points']
        limit = GURU_SCORE_OPPORTUNITIES[key]['limit']
        guru_score += func(user, points, limit)

    return guru_score

def calculate_grade_based_on_rank(score, total):
    for letter_grade, points_grade in GRADE_CUTOFFS:
        if score >= points_grade:
            return letter_grade

def calculate_university_guru_scores(university):
    all_guru_scores = [(guru, calculate_guru_score(guru)) for guru in university.gurus]
    sorted_all_guru_scores = sorted(all_guru_scores, key=lambda g:g[1])
    return sorted_all_guru_scores

def guru_rank_response_rate(user, points, limit):
    guru_points = 0
    limit_count = 0
    for proposal in user.proposals:
        for event in proposal.events:
            if event.status == 2 or event.status == 3:
                guru_points += guru_points
                if limit: limit_count += 1
                if limit and limit_count <= limit: return guru_points

    return guru_points

GURU_SCORE_OPPORTUNITIES = {
    'Response Rate': {
        'points': 2,
        'description': "Respond to incoming student requests. Doesn't matter if you accept or reject.",
        'limit': None,
        'impact_level': 3,
        'function': guru_rank_response_rate,
    }
    # },
    # 'Ratings': {
    #     'points': "> 10",
    #     'function': ,  'guru_rank_ratings'
    # },
    # 'Referral': {
    #     'points': 10,
    #     'limit': 5
    # },
    # 'Extra Information': {
    #     'points': 'Varies',
    #     'limit': None,
    #     'description':
    # }
}