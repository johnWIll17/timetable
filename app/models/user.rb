class User < ActiveRecord::Base
  # authenticates_with_sorcery!

  # before_create :set_auth_token

  validates :password, length: { minimum: 3 },
                       confirmation: true
  validates :email, uniqueness: true,
                    email_format: { message: 'has invalid format' }

  # private
  #   def set_auth_token
  #     return if auth_token.present?
  #     self.auth_token = generate_auth_token
  #   end
  #
  #   def generate_auth_token
  #     loop do
  #       token = SecureRandom.hex
  #       break token unless self.class.exists?(auth_token: token)
  #     end
  #   end
end
