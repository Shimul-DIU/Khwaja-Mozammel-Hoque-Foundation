CREATE TABLE IF NOT EXISTS devotees (
    kmrf_id VARCHAR(30) PRIMARY KEY
    -- DEFAULT 'KMRF-' || LPAD(nextval('kmrf_id_seq')::TEXT, 6, '0')

    purpose VARCHAR(255),
    designation VARCHAR(255),

    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    spouse_name VARCHAR(255),
    photo_url VARCHAR(500),

    country VARCHAR(100) DEFAULT 'বাংলাদেশ',
    division VARCHAR(100),
    district VARCHAR(100),
    ps VARCHAR(100),
    union_name VARCHAR(100),
    po VARCHAR(100),
    post_code VARCHAR(20),
    village VARCHAR(255),
    street VARCHAR(255),
    dob TEXT[],

    religion VARCHAR(100),
    blood_group VARCHAR(10),
    profession VARCHAR(255),
    nationality VARCHAR(100) DEFAULT 'বাংলাদেশি',
    email VARCHAR(255),
    contact_no VARCHAR(20),
    password VARCHAR(255),

    id_type VARCHAR(10)
        CHECK (id_type IN ('NID', 'BRN', 'PPN', '')),

    id_number TEXT[],

    gender VARCHAR(10)
        CHECK (gender IN ('male', 'female', '')),

    marital_status VARCHAR(20)
        CHECK (marital_status IN ('married', 'unmarried', '')),

    son_count INTEGER DEFAULT 0,
    daughter_count INTEGER DEFAULT 0,

    widow BOOLEAN DEFAULT FALSE,
    widower BOOLEAN DEFAULT FALSE,
    divorced BOOLEAN DEFAULT FALSE,
    passed_away BOOLEAN DEFAULT FALSE,
    security_volunteer BOOLEAN DEFAULT FALSE,

    education VARCHAR(20)
        CHECK (
            education IN (
                'underSSC',
                'SSC',
                'HSC',
                'bachelors',
                'masters',
                'doctorate',
                ''
            )
        ),

    follower_mozammel BOOLEAN DEFAULT FALSE,
    follower_yunus BOOLEAN DEFAULT FALSE,
    other_nesbot BOOLEAN DEFAULT FALSE,
    other_nesbot_detail TEXT,
    joining_date VARCHAR(20),

    join_sadka BOOLEAN DEFAULT FALSE,

    khadem_name VARCHAR(255),
    coordinator_name VARCHAR(255),

    region VARCHAR(255),

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);