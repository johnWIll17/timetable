module Api
  module V1
    class ApiBaseController < ApplicationController
      # before_action :authenticate
      # before_action :restrict_access

      respond_to :json

      def initialize
        super
        @model = nil
      end

      def index
        respond_with @model.all if @model
      end

      def show
        respond_with @model.find(params[:id]) if @model
      end

      protected
        def authenticate
          authenticate_or_request_with_http_token do |token, options|
            # User.find_by(auth_token: token)
            current_user.auth_token == token
          end
        end

        # def not_authenticate_API
        #   if 
        # end

        def restrict_access
          token = params[:token]
          head :unauthorized unless token == current_user.auth_token
        end

    end
  end
end
