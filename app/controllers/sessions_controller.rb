class SessionsController < ApplicationController
  skip_before_action :require_login, except: [:destroy]

  def new
  end

  def create
    # @c_user = login(params[:email], params[:password])
    if login(params[:email], params[:password])
    # if @c_user
      # current_user.update(auth_token: 'sfd')
      # current_user.update(auth_token: 'sfs')
      current_user.auth_token = 'asfsdf'
      current_user.save
      # generate_auth_token
      # generate_test_random
      # token = SecureRandom.hex
      #
      # current_user.update(auth_token: token)

      render text: current_user.class
      flash[:success] = 'Welcome back!'
      # redirect_to root_path
    else
      flash.now[:warning] = 'E-mail and/or password is incorrect.'
      render 'new'
    end
  end

  def destroy
    logout
    flash[:success] = 'See you again!'
    redirect_to log_in_path
  end

  private
    def generate_test_random
      current_user.update(test: 'random')
    end
    def generate_auth_token
      token = SecureRandom.hex
      current_user.update(auth_token: token)
    end

end
