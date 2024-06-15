### gardener.user

```sql
CREATE TABLE IF NOT EXISTS gardener.user (
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
  username              varchar(128) UNIQUE       NOT NULL                                  ,
  password              varchar(512)              NOT NULL                                  ,
  role                  varchar(32)                           DEFAULT 'user'                ,
  nickname              varchar(64) UNIQUE                                                  ,
  first_name            varchar(128)                                                        ,
  middle_name           varchar(128)                                                        ,
  last_name             varchar(128)                                                        ,
  email                 varchar(512) UNIQUE                                                 ,
  mobile                varchar(512) UNIQUE                                                 ,
  info                  JSON                                                                ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP     ,
  udt_date              timestamp                                                           ,
  del_date              timestamp                                                           ,
  use_yn                boolean                   NOT NULL    DEFAULT TRUE                  ,
  del_yn                boolean                   NOT NULL    DEFAULT FALSE                 ,
  UNIQUE(uuid)
);

CREATE UNIQUE INDEX user_idx        ON gardener.user (idx);
CREATE UNIQUE INDEX user_cre_date   ON gardener.user (cre_date);
CREATE UNIQUE INDEX user_udt_date   ON gardener.user (udt_date);

CREATE INDEX  hash_user_uuid        ON gardener.user     USING hash (uuid);
CREATE INDEX  hash_user_username    ON gardener.user     USING hash (username);
CREATE INDEX  hash_user_nickname    ON gardener.user     USING hash (nickname);
CREATE INDEX  hash_user_email       ON gardener.user     USING hash (email);
CREATE INDEX  hash_user_mobile      ON gardener.user     USING hash (mobile);

CREATE INDEX  partial_user_del_date ON gardener.user (cre_date) WHERE del_date IS NULL;

COMMENT ON COLUMN gardener.user.idx                  IS '사용자 고유 인텍스 ID';
COMMENT ON COLUMN gardener.user.uuid                 IS '사용자 고유 값';
COMMENT ON COLUMN gardener.user.username             IS '사용자 아이디';
COMMENT ON COLUMN gardener.user.password             IS '[bcrypt] 사용자 암호';
COMMENT ON COLUMN gardener.user.role                 IS '사용자 권한';
COMMENT ON COLUMN gardener.user.nickname             IS '사용자 닉네임';
COMMENT ON COLUMN gardener.user.first_name           IS '사용자 이름';
COMMENT ON COLUMN gardener.user.middle_name          IS '사용자 이름';
COMMENT ON COLUMN gardener.user.last_name            IS '사용자 이름';
COMMENT ON COLUMN gardener.user.email                IS '[AES]사용자 메일 주소';
COMMENT ON COLUMN gardener.user.mobile               IS '[AES]사용자 전화번호';
COMMENT ON COLUMN gardener.user.info                 IS '기타 내용';
COMMENT ON COLUMN gardener.user.cre_date             IS '사용자 생성일';
COMMENT ON COLUMN gardener.user.udt_date             IS '사용자 수정일';
COMMENT ON COLUMN gardener.user.del_date             IS '사용자 삭제일';
COMMENT ON COLUMN gardener.user.use_yn               IS '사용여부';
COMMENT ON COLUMN gardener.user.del_yn               IS '삭제여부';
```

### garden.board

```sql
CREATE TABLE IF NOT EXISTS garden.board (
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
  cre_idx               BIGINT                                                              ,
  cre_uuid              uuid                                                                ,
  password              varchar(512)                                                        ,
  title                 varchar(128)              NOT NULL                                  ,
  content               text                                                                ,
  content_html          text                                                                ,
  content_md            text                                                                ,
  content_data          JSON                                                                ,
  is_secret             boolean                   NOT NULL    DEFAULT TRUE                  ,
  info                  JSON                                                                ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP     ,
  udt_date              timestamp                                                           ,
  del_date              timestamp                                                           ,
  use_yn                boolean                   NOT NULL    DEFAULT TRUE                  ,
  del_yn                boolean                   NOT NULL    DEFAULT FALSE                 ,
  UNIQUE(uuid)
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
COMMENT ON COLUMN garden.board.password         IS '[PBKDF2] 게시판 공개 암호';
COMMENT ON COLUMN garden.board.title            IS '게시판 제목';
COMMENT ON COLUMN garden.board.content          IS '게시판 내용';
COMMENT ON COLUMN garden.board.content_html     IS '게시판 내용 html';
COMMENT ON COLUMN garden.board.content_md       IS '게시판 내용 md';
COMMENT ON COLUMN garden.board.content_data     IS '게시판 첨부 내용';
COMMENT ON COLUMN garden.board.is_secret        IS '공게여부';
COMMENT ON COLUMN garden.board.info             IS '기타 내용';
COMMENT ON COLUMN garden.board.cre_date         IS '게시판 생성일';
COMMENT ON COLUMN garden.board.udt_date         IS '게시판 수정일';
COMMENT ON COLUMN garden.board.del_date         IS '게시판 삭제일';
COMMENT ON COLUMN garden.board.use_yn           IS '사용여부';
COMMENT ON COLUMN garden.board.del_yn           IS '삭제여부';
```

### gardener.refresh_token

```sql
CREATE TABLE IF NOT EXISTS gardener.refresh_token(
  idx                   BIGSERIAL PRIMARY KEY     NOT NULL                                  ,
  uuid                  uuid                      NOT NULL    DEFAULT uuid_generate_v4()    ,
	payload               JSON                                                                ,
	is_valid              boolean                   NOT NULL    DEFAULT FALSE                 ,
  cre_date              timestamp                 NOT NULL    DEFAULT CURRENT_TIMESTAMP     ,
  expires               integer                   NOT NULL
);

CREATE UNIQUE INDEX refresh_token_idx        ON gardener.refresh_token(idx);

CREATE INDEX  hash_refresh_token_uuid        ON gardener.refresh_token  USING hash (uuid);

CREATE INDEX  partial_refresh_token_del_date ON gardener.refresh_token (cre_date) WHERE is_valid IS true;
```
