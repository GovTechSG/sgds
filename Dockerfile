FROM ruby:2.5.1

WORKDIR /usr/src/app

RUN apt-get update -qq && apt-get install -y build-essential

#ADD Gemfile Gemfile
#ADD Gemfile.lock Gemfile.lock

RUN gem install bundler

RUN gem install jekyll

COPY . /usr/src/app

RUN bundle install

EXPOSE 4000

CMD [ "bundle", "exec", "jekyll", "serve", "--force_polling", "-H", "0.0.0.0", "-P", "4000" ]
#CMD bundle exec jekyll serve

