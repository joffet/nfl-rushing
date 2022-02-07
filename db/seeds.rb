# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
records = JSON.parse(File.read(Rails.root + "db/rushing.json"))
records.each do |json_hash|
    formatted_hash = Hash.new
    json_hash.each do |key,value|
        new_key = key.dup
        new_key["/G"] = "_per_goal" if new_key.include? "/G"
        new_key["1st%"] = "First_percentage" if new_key.include? "1st%"
        new_key["1st"] = "First" if new_key.include? "1st"
        new_key["20+"] = "Twenty_plus" if new_key.include? "20+"
        new_key["40+"] = "Forty_plus" if new_key.include? "40+"
        if key === "Lng" && value.class == String
            formatted_hash["Lng"] = value.dup.delete("T").to_i
            formatted_hash["Lng_with_touchdown"] = true if value.include? "T"
        else
            formatted_hash[new_key] = value
        end
    end
    PlayerRushing.create!(formatted_hash)
end