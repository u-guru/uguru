import requests,json
from bs4 import BeautifulSoup


cookies = {'cookies':'.ASPXANONYMOUS=4s7KSfkz0QEkAAAANDIxZDhkMzYtOWUyNi00ZDZmLWE2MjQtMGYzNWI2NzczODlmEgYKy4RF3-mlUAoKrn5HBlOIW2I1; ASP.NET_SessionId=2srowyzvvs2dszuvcsk2jzyi; WyzAntRef=null; WyzAntGVal=; landingUrl=http://www.wyzant.com/; visitorID=d5c38f95-6e75-4742-bbfc-594890d1f0fc; lv=10/2/2015 6:09:54 PM; WyzAntFirstVisit=true; WyzantWWWAffinity=94ebc32265dc8e101a8eee8159749d8fb38c6357b8270ad09f040cc88ed18fe5; optimizelyEndUserId=oeu1443827395365r0.00015892763622105122; _cio=efc35a82-b1d2-ed22-6187-133f99e7508d; zip=94141; optimizely=3550520044; _gat=1; optimizelySegments=%7B%22173837634%22%3A%22campaign%22%2C%22173876126%22%3A%22false%22%2C%22173896022%22%3A%22gc%22%7D; optimizelyBuckets=%7B%2296710543%22%3A%220%22%2C%223550520044%22%3A%223555860014%22%7D; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22103377915%22; _ga=GA1.2.1912423747.1443827396; optimizelyPendingLogEvents=%5B%5D'}
url = requests.get('https://www.wyzant.com/match?flow=search&kw=&z=94141',cookies=cookies).text
soup = BeautifulSoup(url)
main_wrapper = soup.findAll('div', attrs = {'class':'tutorInfo'})
