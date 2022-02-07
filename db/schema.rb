# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_07_003350) do

  create_table "player_rushings", force: :cascade do |t|
    t.string "Player"
    t.string "Team"
    t.string "Pos"
    t.integer "Att"
    t.decimal "Att_per_goal", precision: 20, scale: 4
    t.integer "Yds"
    t.decimal "Avg"
    t.decimal "Yds_per_goal", precision: 20, scale: 4
    t.integer "TD"
    t.integer "Lng"
    t.boolean "Lng_with_touchdown", default: false
    t.integer "First"
    t.decimal "First_percentage", precision: 20, scale: 4
    t.string "Twenty_plus"
    t.string "Forty_plus"
    t.string "FUM"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
