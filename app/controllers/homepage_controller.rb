class HomepageController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @dataObject = { 
      dataArray: PlayerRushing.all.order('updated_at DESC').limit(300).to_a,
      totalRecordCount: PlayerRushing.all.count
    }
  end

  def api
    lastRecord = PlayerRushing.find(params["lastRecordId"])
    nextRecords = PlayerRushing.where( 'updated_at < ?', lastRecord.updated_at )
    render json: { nextRecords: nextRecords } and return
  end

end
