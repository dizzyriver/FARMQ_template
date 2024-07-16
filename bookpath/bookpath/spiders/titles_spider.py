"""
import scrapy
import random
import json
import os
from scrapy import Request
from bookpath.items import BookpathItem


class BookpathSpider(scrapy.Spider):
    name = "bookpath"
    allowed_domains = ["bookpath.gr"]

    def start_requests(self):
        user_agents = self.settings.get("USER_AGENTS")
        start_urls = self.load_active_urls()

        for url in start_urls:
            yield Request(url, headers={"User-Agent": random.choice(user_agents)})

    def parse(self, response):
        # Extract book titles
        for book in response.css("div.product-teaser"):
            title = book.css("h3.text-h5 a::text").get()
            item = BookpathItem(title=title)
            yield item

        # Follow pagination links using the meta tag
        next_page = response.css('link[rel="next"]::attr(href)').get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            self.logger.info(f"Following pagination link to: {next_page}")
            yield scrapy.Request(
                next_page,
                callback=self.parse,
                headers={"User-Agent": random.choice(self.settings.get("USER_AGENTS"))},
            )
        else:
            self.logger.info("No more pagination links found.")

    def load_active_urls(self):
        # Get the absolute path to the config file
        script_dir = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(script_dir, "config.json")

        with open(config_path, "r") as f:
            config = json.load(f)
        return [
            category["url"] for category in config["categories"] if category["active"]
        ]
"""

import scrapy
import random
import json
import os
from scrapy import Request
from bookpath.items import BookpathItem


class BookpathSpider(scrapy.Spider):
    name = "bookpath"
    allowed_domains = ["bookpath.gr"]

    def start_requests(self):
        user_agents = self.settings.get("USER_AGENTS")
        start_urls = self.load_active_urls()

        for url in start_urls:
            yield Request(url, headers={"User-Agent": random.choice(user_agents)})

    def parse(self, response):
        # Extract product links
        for book in response.css("div.product-teaser a.image::attr(href)").getall():
            product_url = response.urljoin(book)
            yield scrapy.Request(
                product_url,
                callback=self.parse_product,
                headers={"User-Agent": random.choice(self.settings.get("USER_AGENTS"))},
            )

        # Follow pagination links using the meta tag
        next_page = response.css('link[rel="next"]::attr(href)').get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            self.logger.info(f"Following pagination link to: {next_page}")
            yield scrapy.Request(
                next_page,
                callback=self.parse,
                headers={"User-Agent": random.choice(self.settings.get("USER_AGENTS"))},
            )
        else:
            self.logger.info("No more pagination links found.")

    def parse_product(self, response):
        # Extract book details
        title = response.css("h1::text").get()
        isbn = response.css(
            "div#product-information div:contains('ISBN')::text"
        ).re_first(r":\s*(.*)")

        item = BookpathItem(title=title, isbn=isbn)

        yield item

    def load_active_urls(self):
        # Get the absolute path to the config file
        script_dir = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(script_dir, "config.json")

        with open(config_path, "r") as f:
            config = json.load(f)
        return [
            category["url"] for category in config["categories"] if category["active"]
        ]
