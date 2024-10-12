from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select
import requests
import os
import time
import pickle

from webdriver_manager.chrome import ChromeDriverManager

service = Service(
    executable_path='D:\\Learn MERN\\chromedriver-win64\\chromedriver.exe')
driver = webdriver.Chrome(service=service)
driver.get("https://services.ecourts.gov.in/ecourtindia_v6/")

# Not need to change
elem = driver.find_element(By.ID, "leftPaneMenuCS").click()

button_xpath = "//button[@type='button' and @class='btn-close' and @data-bs-dismiss='modal' and @aria-label='Close']"

wait = WebDriverWait(driver, 10)

button = wait.until(EC.element_to_be_clickable((By.XPATH, button_xpath)))
driver.execute_script("arguments[0].scrollIntoView(true);", button)
time.sleep(0.5)

button.click()

button = wait.until(EC.element_to_be_clickable((By.ID, "casetype-tabMenu")))
driver.execute_script("arguments[0].scrollIntoView(true);", button)
time.sleep(0.5)
button.click()

button2 = wait.until(EC.element_to_be_clickable(
    (By.XPATH, "//button[@type='button' and @class='btn btn-primary btn-sm' and @data-bs-dismiss='modal']")))

# print(button2.get_attribute('outerHTML'))
driver.execute_script("arguments[0].scrollIntoView(true);", button2)
time.sleep(0.5)
button2.click()

select_element = driver.find_element(By.ID, "sess_state_code")
select = Select(select_element)
select.select_by_value("1")

time.sleep(0.5)

# Here till

abbreviations = [
    "M.A.C.P. - Motor Accident Claim Petition",
    # "MACP C Appln. - Civil Application in Motor Accident Claim",
    # "MACP. Dkst. - Execution of Award in Motor Accident Claims",
    # "MACP. M.A. - Misc. Application in Motor Accident Claims",
    # "MACP Spl. - Motor Accident Claim Petition (Special)",
    # "MACP M.A.N.R.J.I. - Misc. Appln. not requiring Judicial Inquiry in Motor Accident Claim Petition"
]

f1 = 0
f2 = 0
f3 = 0
f4 = 0

loaded_list = [0, 0, 0, 0]
ilist = [0, 0, 0, 0]

# with open('pdf_ind.pkl', 'wb') as f:
#     pickle.dump(loaded_list, f)

with open('pdf_ind.pkl', 'rb') as f:
    loaded_list = pickle.load(f)

print("loaded_list", loaded_list)


def download_file(url, filename=None, chunk_size=1024):

    response = requests.get(url, stream=True)

    if not filename:
        filename = url.split('/')[-1]

    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size):
            f.write(chunk)

    return filename

# # Example usage:
# url = "https://example.com/file.zip"
# filename = download_file(url)
# print("File downloaded:", filename)


def fn1():

    try:
        elements = driver.find_elements(By.CLASS_NAME, "someclass")

        f4 = len(elements)

        for i in range(loaded_list[3], f4):
            ilist[3] = i
            print("print cur_state", ilist)
            element = elements[i]
        # for element in elements:
            driver.execute_script(
                "arguments[0].scrollIntoView(true);", element)
            time.sleep(1)
            element.click()

            time.sleep(0.5)
            element2 = driver.find_element(By.ID, 'CScaseType')

            d = element2.get_attribute("outerHTML")

            time.sleep(0.5)

            # with open("data/st3.html", "a", encoding="utf-8") as f:
            #     f.write(d)
            
            time.sleep(2)

            link = driver.find_element(By.XPATH, ".//tr[2]/td[3]//a")
            print(link.get_attribute("outerHTML"))

            driver.execute_script("arguments[0].scrollIntoView(true);", link)

            time.sleep(120)
            # link.click()
            

            time.sleep(5)
            object_element = driver.find_element(By.XPATH, ".//div[@id='modal_order_body']//object")
            print(object_element.get_attribute('innerHTML'))


            time.sleep(5)
            pdf_url = object_element.get_attribute('data')
            time.sleep(5)
            nwurl = "https://services.ecourts.gov.in/ecourtindia_v6/" + pdf_url


            # url = "https://example.com/file.zip"
            # filename = download_file(nwurl)
            # print("File downloaded:", filename)

            # driver.get(nwurl)


            element2 = driver.find_element(By.ID, 'main_back_caseType')
            time.sleep(0.5)
            driver.execute_script(
                "arguments[0].scrollIntoView(true);", element2)

            time.sleep(1)

            element2.click()

            time.sleep(0.5)
        loaded_list[3] = 0

    except Exception as e:
        print("printitn ilist", ilist)
        loaded_list = ilist
        with open('pdf_ind.pkl', 'wb') as f:
            pickle.dump(ilist, f)
        print("indexes are saved")
        return


def fn4():
    input_element = driver.find_element(By.ID, "search_year")

    input_element.clear()

    input_element.send_keys("2024")

    time.sleep(0.5)

    radio_button = driver.find_element(By.ID , "radDCT")
    time.sleep(0.5)
    radio_button.click()

    time.sleep(0.5)

    input_element = driver.find_element(By.ID, "ct_captcha_code")

    wait = WebDriverWait(driver, 20)  # Adjust the timeout as needed
    wait.until(EC.presence_of_element_located((By.ID, "ct_captcha_code")))
    wait.until(lambda driver: len(input_element.get_attribute('value')) < 6)

# Print the value in the input field
    captcha_value = input_element.get_attribute('value')

    # print("Captcha value:", captcha_value)

# input_field = driver.find_element(By.ID, "ct_captcha_code")

    try:
        harsh = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//thead//tr"))
        )
        # print("Element found:", harsh.get_attribute('outerHTML'))
    except Exception as e:
        print("Element not found:", e)
        print("printitn ilist", ilist)
        loaded_list = ilist
        with open('pdf_ind.pkl', 'wb') as f:
            pickle.dump(ilist, f)
        print("indexes are saved")
        return

    time.sleep(0.5)

    fn1()


def is_abbreviation_present(string):
    for abbreviation in abbreviations:
        if abbreviation.startswith(string):
            return True
    return False


def fn3():
    select_element = driver.find_element(By.ID, "case_type_2")
    select = Select(select_element)
    all_options = select.options

    f3 = len(all_options)

    for i in range(loaded_list[2], f3):
        if (all_options[i].get_attribute("value") != ""):
            if (is_abbreviation_present(all_options[i].text)):
                # print(all_options[i].get_attribute("value"))
                time.sleep(2)
                all_options[i].click()
                time.sleep(0.5)
                ilist[2] = i
                fn4()
    loaded_list[2] = 0

    # for option in all_options:
    #     if(option.get_attribute("value") != ""):
    #         if(is_abbreviation_present(option.text)):
    #             print(option.get_attribute("value"))
    #             option.click()
    #             time.sleep(0.5)
    #             fn4()


def fn2():
    select_element3 = driver.find_element(By.ID, "court_complex_code")
    select3 = Select(select_element3)
    all_options = select3.options

    f2 = len(all_options)
    for i in range(loaded_list[1], f2):
        if (all_options[i].get_attribute("value") != ""):
            # print(all_options[i].get_attribute("value"))
            all_options[i].click()
            time.sleep(0.5)
            ilist[1] = i
            fn3()
    loaded_list[1] = 0

# Here I have to change

# select_element2 = driver.find_element(By.ID, "sess_dist_code")
# select2 = Select(select_element2)
# select2.select_by_value("25")


select_element2 = driver.find_element(By.ID, "sess_dist_code")
select2 = Select(select_element2)
all_options = select2.options

f1 = len(all_options)
for i in range(loaded_list[0], f1):
    if (all_options[i].get_attribute("value") != ""):
        # print(all_options[i].get_attribute("value"))
        all_options[i].click()
        time.sleep(0.5)
        ilist[0] = i
        fn2()


with open('pdf_ind.pkl', 'wb') as f:
    pickle.dump(loaded_list, f)


print("all Done Party")

time.sleep(5)

driver.quit()