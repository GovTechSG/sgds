FROM ruby:2-slim

WORKDIR /usr/src/app

RUN apt-get update -qq && apt-get install -y build-essential

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

RUN bundle exec jekyll build

RUN apt-get install nginx -y

RUN cp -R ./_site/* /var/www/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
