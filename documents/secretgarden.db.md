```sql
CREATE DATABASE CREATE DATABASE secretgarden ENCODING utf8 LC_COLLATE 'C' ALLOW_CONNECTIONS true CONNECTION_LIMIT 128 TEMPLATE template0;

CREATE SCHEMA IF NOT EXISTS gardener;
CREATE SCHEMA IF NOT EXISTS garden;

CREATE USER sickdog WITH PASSWORD 'Password$123' NOSUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;
ALTER DATABASE secretgarden OWNER TO sickdog;
GRANT CONNECT ON DATABASE secretgarden TO sickdog;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA gardener, garden TO sickdog;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA gardener, garden TO crywolf;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### gardener.admin

```sql
CREATE TABLE IF NOT EXISTS gardener.admin (
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
  user_id               varchar(128)              NOT NULL                                  ,
  password              varchar(512)              NOT NULL                                  ,
  role                  varchar(32)                           DEFAULT 'admin'               ,
  nickname              varchar(64)                                                         ,
  first_name            varchar(128)                                                        ,
  middle_name           varchar(128)                                                        ,
  last_name             varchar(128)                                                        ,
  birth_year            varchar(4)                                                          ,
  birth_month           varchar(2)                                                          ,
  birth_day             varchar(2)                                                          ,
  gender                char(1)                                                             ,
  email                 varchar(128)                                                        ,
  email_aes             varchar(512)                                                        ,
  mobile                varchar(32)                                                         ,
  mobile1               varchar(8)                                                          ,
  mobile2               varchar(8)                                                          ,
  mobile3               varchar(8)                                                          ,
  nationality           varchar(4)                                                          ,
  address               varchar(128)                                                        ,
  address1              varchar(64)                                                         ,
  address2              varchar(64)                                                         ,
  postal_code           varchar(12)                                                         ,
  company               varchar(32)                                                         ,
  department1           varchar(32)                                                         ,
  department2           varchar(32)                                                         ,
  phone                 varchar(24)                                                         ,
  phone1                varchar(8)                                                          ,
  phone2                varchar(8)                                                          ,
  phone3                varchar(8)                                                          ,
  company_country       varchar(8)                                                          ,
  company_address       varchar(128)                                                        ,
  company_address1      varchar(64)                                                         ,
  company_address2      varchar(64)                                                         ,
  company_postal_code   varchar(12)                                                         ,
  text                  text                                                                ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP     ,
  udt_date              timestamp                                                           ,
  del_date              timestamp                                                           ,
  use_yn                boolean                   NOT NULL    DEFAULT TRUE                  ,
  del_yn                boolean                   NOT NULL    DEFAULT FALSE
);

CREATE UNIQUE INDEX admin_idx        ON gardener.admin (idx);
CREATE UNIQUE INDEX admin_uuid       ON gardener.admin (uuid);
CREATE UNIQUE INDEX admin_cre_date   ON gardener.admin (cre_date);
CREATE UNIQUE INDEX admin_udt_date   ON gardener.admin (udt_date);

CREATE INDEX  hash_admin_uuid        ON gardener.admin     USING hash (uuid);
CREATE INDEX  hash_admin_user_id     ON gardener.admin     USING hash (user_id);
CREATE INDEX  hash_admin_nickname    ON gardener.admin     USING hash (nickname);
CREATE INDEX  hash_admin_email_aes   ON gardener.admin     USING hash (email_aes);
CREATE INDEX  hash_admin_mobile1     ON gardener.admin     USING hash (mobile1);
CREATE INDEX  hash_admin_mobile2     ON gardener.admin     USING hash (mobile2);
CREATE INDEX  hash_admin_mobile3     ON gardener.admin     USING hash (mobile3);

CREATE INDEX  partial_admin_del_date ON gardener.admin (cre_date) WHERE del_date IS NULL;

COMMENT ON COLUMN gardener.admin.idx                  IS '관리자 고유 인텍스 ID';
COMMENT ON COLUMN gardener.admin.uuid                 IS '관리자 고유 값';
COMMENT ON COLUMN gardener.admin.user_id              IS '관리자 아이디';
COMMENT ON COLUMN gardener.admin.password             IS '[PBKDF2] 관리자 암호';
COMMENT ON COLUMN gardener.admin.role                 IS '관리자 권한';
COMMENT ON COLUMN gardener.admin.nickname             IS '관리자 닉네임';
COMMENT ON COLUMN gardener.admin.first_name           IS '관리자 이름';
COMMENT ON COLUMN gardener.admin.middle_name          IS '관리자 이름';
COMMENT ON COLUMN gardener.admin.last_name            IS '관리자 이름';
COMMENT ON COLUMN gardener.admin.birth_year           IS '관리자 생년월일';
COMMENT ON COLUMN gardener.admin.birth_month          IS '관리자 생년월일';
COMMENT ON COLUMN gardener.admin.birth_day            IS '관리자 생년월일';
COMMENT ON COLUMN gardener.admin.gender               IS '관리자 성별';
COMMENT ON COLUMN gardener.admin.email                IS '관리자 메일 주소';
COMMENT ON COLUMN gardener.admin.email_aes            IS '[AES] 관리자 메일 주소';
COMMENT ON COLUMN gardener.admin.mobile               IS '관리자 전화번호';
COMMENT ON COLUMN gardener.admin.mobile1              IS '[AES] 관리자 전화번호';
COMMENT ON COLUMN gardener.admin.mobile2              IS '[AES] 관리자 전화번호';
COMMENT ON COLUMN gardener.admin.mobile3              IS '[AES] 관리자 전화번호';
COMMENT ON COLUMN gardener.admin.nationality          IS '[CODE] 관리자 국가';
COMMENT ON COLUMN gardener.admin.address              IS '관리자 주소';
COMMENT ON COLUMN gardener.admin.address1             IS '[AES] 관리자 주소';
COMMENT ON COLUMN gardener.admin.address2             IS '[AES] 관리자 주소';
COMMENT ON COLUMN gardener.admin.postal_code          IS '관리자 우편번호';
COMMENT ON COLUMN gardener.admin.company              IS '관리자 소속 기업';
COMMENT ON COLUMN gardener.admin.department1          IS '관리자 소속 부서 1';
COMMENT ON COLUMN gardener.admin.department2          IS '관리자 소속 부서 2';
COMMENT ON COLUMN gardener.admin.phone                IS '관리자 직장 전화번호';
COMMENT ON COLUMN gardener.admin.phone1               IS '관리자 직장 전화번호 1';
COMMENT ON COLUMN gardener.admin.phone2               IS '관리자 직장 전화번호 2';
COMMENT ON COLUMN gardener.admin.phone3               IS '관리자 직장 전화번호 3';
COMMENT ON COLUMN gardener.admin.company_country      IS '[CODE] 관리자 직장 국가';
COMMENT ON COLUMN gardener.admin.company_address1     IS '관리자 직장 주소';
COMMENT ON COLUMN gardener.admin.company_address1     IS '관리자 직장 주소 1';
COMMENT ON COLUMN gardener.admin.company_address2     IS '관리자 직장 주소 2';
COMMENT ON COLUMN gardener.admin.company_postal_code  IS '관리자 직장 우편번호';
COMMENT ON COLUMN gardener.admin.text                 IS '기타 내용';
COMMENT ON COLUMN gardener.admin.cre_date             IS '관리자 생성일';
COMMENT ON COLUMN gardener.admin.udt_date             IS '관리자 수정일';
COMMENT ON COLUMN gardener.admin.del_date             IS '관리자 삭제일';
COMMENT ON COLUMN gardener.admin.use_yn               IS '사용여부';
COMMENT ON COLUMN gardener.admin.del_yn               IS '삭제여부';
```

### gardener.user

```sql
CREATE TABLE IF NOT EXISTS gardener.user (
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
  user_id               varchar(128)              NOT NULL                                  ,
  media                 varchar(32)                           DEFAULT 'local'               ,
  sns_idx               varchar(32)                                                         ,
  password              varchar(512)                                                        ,
  role                  varchar(32)                           DEFAULT 'user'                ,
  nickname              varchar(64)                                                         ,
  first_name            varchar(128)                                                        ,
  middle_name           varchar(128)                                                        ,
  last_name             varchar(128)                                                        ,
  birth_year            varchar(4)                                                          ,
  birth_month           varchar(2)                                                          ,
  birth_day             varchar(2)                                                          ,
  gender                char(1)                                                             ,
  email                 varchar(128)                                                        ,
  email_aes             varchar(512)                                                        ,
  mobile                varchar(32)                                                         ,
  mobile1               varchar(8)                                                          ,
  mobile2               varchar(8)                                                          ,
  mobile3               varchar(8)                                                          ,
  nationality           varchar(4)                                                          ,
  address               varchar(128)                                                        ,
  address1              varchar(64)                                                         ,
  address2              varchar(64)                                                         ,
  postal_code           varchar(12)                                                         ,
  company               varchar(32)                                                         ,
  department1           varchar(32)                                                         ,
  department2           varchar(32)                                                         ,
  phone                 varchar(24)                                                         ,
  phone1                varchar(8)                                                          ,
  phone2                varchar(8)                                                          ,
  phone3                varchar(8)                                                          ,
  company_country       varchar(8)                                                          ,
  company_address       varchar(128)                                                        ,
  company_address1      varchar(64)                                                         ,
  company_address2      varchar(64)                                                         ,
  company_postal_code   varchar(12)                                                         ,
  text                  text                                                                ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP     ,
  udt_date              timestamp                                                           ,
  del_date              timestamp                                                           ,
  use_yn                boolean                   NOT NULL    DEFAULT TRUE                  ,
  del_yn                boolean                   NOT NULL    DEFAULT FALSE
);

CREATE UNIQUE INDEX user_idx        ON gardener.user (idx);
CREATE UNIQUE INDEX user_uuid       ON gardener.user (uuid);
CREATE UNIQUE INDEX user_cre_date   ON gardener.user (cre_date);
CREATE UNIQUE INDEX user_udt_date   ON gardener.user (udt_date);

CREATE INDEX  hash_user_uuid        ON gardener.user      USING hash (uuid);
CREATE INDEX  hash_user_user_id     ON gardener.user      USING hash (user_id);
CREATE INDEX  hash_user_nickname    ON gardener.user      USING hash (nickname);
CREATE INDEX  hash_user_email_aes   ON gardener.user      USING hash (email_aes);
CREATE INDEX  hash_user_mobile1     ON gardener.user      USING hash (mobile1);
CREATE INDEX  hash_user_mobile2     ON gardener.user      USING hash (mobile2);
CREATE INDEX  hash_user_mobile3     ON gardener.user      USING hash (mobile3);

CREATE INDEX partial_user_del_date  ON gardener.user (cre_date) WHERE del_date IS NULL;

COMMENT ON COLUMN gardener.user.idx                   IS '사용자 고유 인텍스 ID';
COMMENT ON COLUMN gardener.user.uuid                  IS '사용자 고유 값';
COMMENT ON COLUMN gardener.user.user_id               IS '사용자 아이디';
COMMENT ON COLUMN gardener.user.media                 IS '사용자 로그인 방식';
COMMENT ON COLUMN gardener.user.sns_idx               IS '사용자 SNS 고유값';
COMMENT ON COLUMN gardener.user.password              IS '[PBKDF2] 사용자 암호';
COMMENT ON COLUMN gardener.user.role                  IS '사용자 권한';
COMMENT ON COLUMN gardener.user.nickname              IS '사용자 닉네임';
COMMENT ON COLUMN gardener.user.first_name            IS '사용자 이름';
COMMENT ON COLUMN gardener.user.middle_name           IS '사용자 이름';
COMMENT ON COLUMN gardener.user.last_name             IS '사용자 이름';
COMMENT ON COLUMN gardener.user.birth_year            IS '사용자 생년월일';
COMMENT ON COLUMN gardener.user.birth_month           IS '사용자 생년월일';
COMMENT ON COLUMN gardener.user.birth_day             IS '사용자 생년월일';
COMMENT ON COLUMN gardener.user.gender                IS '사용자 성별';
COMMENT ON COLUMN gardener.user.email                 IS '사용자 메일 주소';
COMMENT ON COLUMN gardener.user.email_aes             IS '[AES] 사용자 메일 주소';
COMMENT ON COLUMN gardener.user.mobile                IS '사용자 전화번호';
COMMENT ON COLUMN gardener.user.mobile1               IS '[AES] 사용자 전화번호';
COMMENT ON COLUMN gardener.user.mobile2               IS '[AES] 사용자 전화번호';
COMMENT ON COLUMN gardener.user.mobile3               IS '[AES] 사용자 전화번호';
COMMENT ON COLUMN gardener.user.nationality           IS '[CODE] 사용자 국가';
COMMENT ON COLUMN gardener.user.address               IS '사용자 주소';
COMMENT ON COLUMN gardener.user.address1              IS '[AES] 사용자 주소';
COMMENT ON COLUMN gardener.user.address2              IS '[AES] 사용자 주소';
COMMENT ON COLUMN gardener.user.postal_code           IS '사용자 우편번호';
COMMENT ON COLUMN gardener.user.company               IS '사용자 소속 기업';
COMMENT ON COLUMN gardener.user.department1           IS '사용자 소속 부서 1';
COMMENT ON COLUMN gardener.user.department2           IS '사용자 소속 부서 2';
COMMENT ON COLUMN gardener.user.phone                 IS '사용자 직장 전화번호';
COMMENT ON COLUMN gardener.user.phone1                IS '사용자 직장 전화번호 1';
COMMENT ON COLUMN gardener.user.phone2                IS '사용자 직장 전화번호 2';
COMMENT ON COLUMN gardener.user.phone3                IS '사용자 직장 전화번호 3';
COMMENT ON COLUMN gardener.user.company_country       IS '[CODE] 사용자 직장 국가';
COMMENT ON COLUMN gardener.user.company_address       IS '사용자 직장 주소';
COMMENT ON COLUMN gardener.user.company_address1      IS '사용자 직장 주소 1';
COMMENT ON COLUMN gardener.user.company_address2      IS '사용자 직장 주소 2';
COMMENT ON COLUMN gardener.user.company_postal_code   IS '사용자 직장 우편번호';
COMMENT ON COLUMN gardener.user.text                  IS '기타 내용';
COMMENT ON COLUMN gardener.user.cre_date              IS '사용자 생성일';
COMMENT ON COLUMN gardener.user.udt_date              IS '사용자 수정일';
COMMENT ON COLUMN gardener.user.del_date              IS '사용자 삭제일';
COMMENT ON COLUMN gardener.user.use_yn                IS '사용여부';
COMMENT ON COLUMN gardener.user.del_yn                IS '삭제여부';
```

### garden.board

```sql
CREATE TABLE IF NOT EXISTS garden.board (
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
  cre_idx               BIGINT                    NOT NULL                                  ,
  cre_uuid              uuid                      NOT NULL                                  ,
  title                 varchar(128)              NOT NULL                                  ,
  content               text                                                                ,
  content_html          text                                                                ,
  content_md            text                                                                ,
  content_data          JSON                                                                ,
  is_secret             boolean                   NOT NULL    DEFAULT TRUE                  ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP     ,
  udt_date              timestamp                                                           ,
  del_date              timestamp                                                           ,
  use_yn                boolean                   NOT NULL    DEFAULT TRUE                  ,
  del_yn                boolean                   NOT NULL    DEFAULT FALSE                 ,
  CONSTRAINT fk_user_idx FOREIGN KEY (cre_idx) REFERENCES gardener.user(idx) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT fk_user_uuid FOREIGN KEY (cre_uuid) REFERENCES gardener.user(uuid) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX board_idx       ON garden.board(idx);
CREATE UNIQUE INDEX board_cre_date  ON garden.board(cre_date);
CREATE UNIQUE INDEX board_udt_date  ON garden.board(udt_date);

CREATE INDEX  hash_board_uuid       ON garden.board USING hash (uuid);

CREATE INDEX  gin_title             ON garden.board USING gin (title);
CREATE INDEX  gin_content           ON garden.board USING gin (content);
CREATE INDEX  gin_content_html      ON garden.board USING gin (content_html);
CREATE INDEX  gin_content_md        ON garden.board USING gin (content_md);

CREATE INDEX  partial_user_del_date ON garden.board (cre_date) WHERE del_date IS NULL;

COMMENT ON COLUMN garden.board.cre_idx          IS '생성 고유 값';
COMMENT ON COLUMN garden.board.uuid             IS '게시판 고유 값';
COMMENT ON COLUMN garden.board.cre_idx          IS '생성자 idx 값';
COMMENT ON COLUMN garden.board.cre_uuid         IS '생성자 uuid 값';
COMMENT ON COLUMN garden.board.title            IS '게시판 제목';
COMMENT ON COLUMN garden.board.content          IS '게시판 내용';
COMMENT ON COLUMN garden.board.content_html     IS '게시판 내용 html';
COMMENT ON COLUMN garden.board.content_md       IS '게시판 내용 md';
COMMENT ON COLUMN garden.board.content_data     IS '게시판 첨부 내용';
COMMENT ON COLUMN garden.board.is_secret        IS '공게여부';
COMMENT ON COLUMN garden.board.cre_date         IS '게시판 생성일';
COMMENT ON COLUMN garden.board.udt_date         IS '게시판 수정일';
COMMENT ON COLUMN garden.board.del_date         IS '게시판 삭제일';
COMMENT ON COLUMN garden.board.use_yn           IS '사용여부';
COMMENT ON COLUMN garden.board.del_yn           IS '삭제여부';
```

### gardener.auth

```sql
CREATE TABLE IF NOT EXISTS gardener.refrech_token(
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
  token_id              varchar(32)               NOT NULL                                  ,
	token                 JSON                                                                ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX refrech_token_idx        ON gardener.refrech_token(idx);

CREATE INDEX  hash_refrech_token_uuid        ON gardener.refrech_token  USING hash (uuid);
CREATE INDEX  hash_refrech_token_token_id    ON gardener.refrech_token  USING hash (token_id);
```
