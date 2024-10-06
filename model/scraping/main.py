from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select
import time

# Import ChromeDriverManager
from webdriver_manager.chrome import ChromeDriverManager

# Initialize Selenium driver (using Chrome)
# Using ChromeDriverManager to automatically manage driver installation
service = Service(executable_path='F:\\HackRx5\\scraped\\chromedriver-win64\\chromedriver.exe')
driver = webdriver.Chrome(service=service)


driver.get("https://services.ecourts.gov.in/ecourtindia_v6/")
elem = driver.find_element(By.ID, "leftPaneMenuCS").click()
elem2 = driver.find_element(By.ID, "leftPaneMenuCS")
button_xpath = "//button[@type='button' and @class='btn-close' and @data-bs-dismiss='modal' and @aria-label='Close']"
# Implement a WebDriverWait with a timeout
wait = WebDriverWait(driver, 30)  # Adjust the timeout as needed
# Wait for the button to be clickable
button = wait.until(EC.element_to_be_clickable((By.XPATH, button_xpath)))
button.click()

button = wait.until(EC.element_to_be_clickable((By.ID, "casetype-tabMenu")))
button.click()

button2 = wait.until(EC.element_to_be_clickable((By.XPATH,"//button[@type='button' and @class='btn btn-primary btn-sm' and @data-bs-dismiss='modal']")))

# print(button2.get_attribute('outerHTML'))
time.sleep(1)
button2.click()

select_element = driver.find_element(By.ID, "sess_state_code")
select = Select(select_element)
select.select_by_value("1")

time.sleep(1)

select_element2 = driver.find_element(By.ID, "sess_dist_code")
select2 = Select(select_element2)
select2.select_by_value("25")

time.sleep(1)

select_element3 = driver.find_element(By.ID, "court_complex_code")
select3 = Select(select_element3)
select3.select_by_value("1010303@1,2,3,22,23@N")

time.sleep(1)

select_element = driver.find_element(By.ID, "case_type_2")
select = Select(select_element)
select.select_by_value("12^23")

time.sleep(1)

# harsh = driver.find_element(By.XPATH, "//thead//tr")

# time.sleep(1)

# print("data html" , harsh.get_attribute('outerHTML'))
# print( "debug", harsh.is_displayed())
# print("debug" , harsh.is_enabled())



time.sleep(1)
input_element = driver.find_element(By.ID, "search_year")

input_element.clear()

input_element.send_keys("2018")

time.sleep(1)

input_element = driver.find_element(By.ID, "ct_captcha_code")


wait = WebDriverWait(driver, 20)  # Adjust the timeout as needed
wait.until(EC.presence_of_element_located((By.ID, "ct_captcha_code")))
wait.until(lambda driver: len(input_element.get_attribute('value')) < 6)

# Print the value in the input field
captcha_value = input_element.get_attribute('value')


# time.sleep(15)



print("Captcha value:", captcha_value)

# input_field = driver.find_element(By.ID, "ct_captcha_code")


try:
    harsh = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//thead//tr"))
    )
    print("Element found:", harsh.get_attribute('outerHTML'))

except Exception as e:
    print("Element not found:", e)


# print(input_field.get_attribute('value'))

time.sleep(10)

driver.quit()
