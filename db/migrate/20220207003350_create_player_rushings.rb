class CreatePlayerRushings < ActiveRecord::Migration[6.1]
  def change
    create_table :player_rushings do |t|
      t.string  :Player
      t.string  :Team
      t.string  :Pos
      t.integer :Att
      t.decimal :Att_per_goal, precision: 20, scale: 4
      t.integer :Yds
      t.decimal :Avg
      t.decimal :Yds_per_goal, precision: 20, scale: 4
      t.integer :TD
      t.integer :Lng
      t.boolean :Lng_with_touchdown, default: false
      t.integer :First
      t.decimal :First_percentage, precision: 20, scale: 4
      t.string  :Twenty_plus
      t.string  :Forty_plus
      t.string  :FUM
      t.timestamps
    end
  end
end
