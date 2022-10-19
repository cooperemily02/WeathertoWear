CREATE TABLE user (
    user_id integer,
    email text,
    username text,
    PRIMARY KEY(user_id)
);
CREATE TABLE weather_preferences (
    user_id integer,
    minimum_hot_temp integer,
    maximum_cold_temp integer,
    PRIMARY KEY(user_id),
    FOREIGN  KEY(user_id) REFERENCES user(user_id)
);
CREATE TABLE closet (
    user_id integer,
    closet_id integer NOT NULL,
    closet_name text,
    PRIMARY KEY(user_id, closet_id),
    FOREIGN  KEY(user_id) REFERENCES user(user_id)
);
CREATE TABLE clothing_item(
    item_id integer,
    closet_id integer,
    item_name text,
    picture_id text,
    item_type text,
    item_sub_type integer,
    is_dirty boolean,
    attributes text,
    PRIMARY KEY(item_id, closet_id),
    FOREIGN  KEY(closet_id) REFERENCES closet(closet_id)
);