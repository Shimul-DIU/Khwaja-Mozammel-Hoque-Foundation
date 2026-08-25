CREATE TABLE IF NOT EXISTS devotees (
    id SERIAL PRIMARY KEY,

    -- Registration details
    purpose VARCHAR(255),
    designation VARCHAR(255),

    -- Personal info
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    spouse_name VARCHAR(255),
    photo_url VARCHAR(500),

    -- Address
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

    -- Other details
    religion VARCHAR(100),
    blood_group VARCHAR(10),
    profession VARCHAR(255),
    nationality VARCHAR(100) DEFAULT 'বাংলাদেশি',
    email VARCHAR(255),
    contact_no VARCHAR(20),

    -- Identity document
    id_type VARCHAR(10)
        CHECK (id_type IN ('NID', 'BRN', 'PPN', '')),

    id_number TEXT[],

    -- Personal status
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

    -- Education
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

    -- Spiritual
    follower_mozammel BOOLEAN DEFAULT FALSE,
    follower_yunus BOOLEAN DEFAULT FALSE,
    other_nesbot BOOLEAN DEFAULT FALSE,
    other_nesbot_detail TEXT,
    joining_date VARCHAR(20),

    -- Sadka
    join_sadka BOOLEAN DEFAULT FALSE,

    -- Khadem & Coordinator
    khadem_name VARCHAR(255),
    coordinator_name VARCHAR(255),

    -- Extra fields
    kmrf_id TEXT[],
    region VARCHAR(255),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE devotees
ADD COLUMN IF NOT EXISTS photo_url VARCHAR(500);


-- =========================================================
-- UPDATED_AT FUNCTION
-- =========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =========================================================
-- UPDATED_AT TRIGGER
-- =========================================================

DROP TRIGGER IF EXISTS update_devotees_updated_at
ON devotees;

CREATE TRIGGER update_devotees_updated_at
BEFORE UPDATE ON devotees
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();