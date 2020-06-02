Rails.application.routes.draw do

  post 'dashboard/simulate'
  get 'dashboard/index'
  get 'dashboard/ies'
  get 'dashboard/documentation'
  get 'dashboard/about'
  get 'dashboard/help'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'dashboard#index'
end
