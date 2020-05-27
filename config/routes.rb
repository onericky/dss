Rails.application.routes.draw do

  get 'dashboard/index'
  get 'dashboard/ies'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'dashboard#index'
end
