# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestSignout():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_signout(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1193, 795)
    self.driver.find_element(By.ID, "email-address").send_keys("abhinavshashank008@gmail.com")
    self.driver.find_element(By.ID, "password").send_keys("Admin123")
    self.driver.find_element(By.LINK_TEXT, "Sign Out").click()
    self.driver.find_element(By.ID, "email-address").send_keys("abhinavshashank008@gmail.com")
    self.driver.find_element(By.ID, "password").send_keys("Admin123")
    self.driver.find_element(By.CSS_SELECTOR, "#root > div").click()
    element = self.driver.find_element(By.CSS_SELECTOR, "h1")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).click_and_hold().perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "h1")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "h1")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).release().perform()
    self.driver.find_element(By.CSS_SELECTOR, "h1").click()
    element = self.driver.find_element(By.CSS_SELECTOR, "#root > div")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).click_and_hold().perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "#root > div")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "#root > div")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).release().perform()
    self.driver.find_element(By.CSS_SELECTOR, "#root > div").click()
    self.driver.close()
  