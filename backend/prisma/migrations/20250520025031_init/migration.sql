-- CreateTable
CREATE TABLE "page_visits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" INTEGER,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "time_spent" INTEGER NOT NULL DEFAULT 0,
    "screen" TEXT,
    "user_agent" TEXT,
    "ip_address" INET,
    "visited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "owner_id" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "status" TEXT NOT NULL DEFAULT 'active',
    "budget" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_links" (
    "campaign_id" INTEGER NOT NULL,
    "link_id" INTEGER NOT NULL,

    CONSTRAINT "campaign_links_pkey" PRIMARY KEY ("campaign_id","link_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "campaign_id" INTEGER,
    "short_url_id" INTEGER,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_page_visits_user_id" ON "page_visits"("user_id");

-- CreateIndex
CREATE INDEX "idx_campaigns_user_id" ON "campaigns"("user_id");

-- CreateIndex
CREATE INDEX "idx_campaigns_owner_id" ON "campaigns"("owner_id");

-- CreateIndex
CREATE INDEX "idx_posts_user_id" ON "posts"("user_id");

-- CreateIndex
CREATE INDEX "idx_posts_campaign_id" ON "posts"("campaign_id");

-- CreateIndex
CREATE INDEX "idx_posts_short_url_id" ON "posts"("short_url_id");

-- AddForeignKey
ALTER TABLE "page_visits" ADD CONSTRAINT "page_visits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_links" ADD CONSTRAINT "campaign_links_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_links" ADD CONSTRAINT "campaign_links_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_short_url_id_fkey" FOREIGN KEY ("short_url_id") REFERENCES "links"("id") ON DELETE SET NULL ON UPDATE CASCADE;
