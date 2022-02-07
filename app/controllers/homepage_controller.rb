class HomepageController < ApplicationController
  def index
    @dataObject = { dataArray: PlayerRushing.all.order('Player ASC').to_a }
  end
end
