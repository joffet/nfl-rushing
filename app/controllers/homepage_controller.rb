class HomepageController < ApplicationController
  def index
    @dataObject = { dataArray: PlayerRushing.all.to_a }
  end
end
