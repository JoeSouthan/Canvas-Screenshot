require 'sinatra'
require 'base64'
require 'open-uri'
require 'json'
set :public_folder, 'public'

get '/' do
  redirect 'index.html'
end

get '/convert' do
  content_type 'image/png', :charset => 'utf-8'
  Base64.strict_encode64(open(params[:image_url]).read).to_s
end

post '/export' do
  content_type :json
  decoded_data = File.open("export/#{Time.now.to_i}.png", 'w'){|f| f.write(Base64.decode64(params[:file_data].gsub(/data:image\/.{1,4}\;base64\,/, "")))}
  return {ok: "File Submitted"}.to_json if decoded_data
end
