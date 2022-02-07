class HomepageController < ApplicationController
  def index
    @data = { playerArray: PlayerRushing.all.to_a }
  end
end
