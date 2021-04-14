import requests, json
from bs4 import BeautifulSoup


params = {'__LASTFOCUS':'','__EVENTTARGET':'','__EVENTARGUMENT':'','__VIEWSTATE':'+zaJO1foCoy19hym4YxyKJ3ibmBC9NFNkWjBeTHHgojBJzAcSFdj9fa0xhUvh6tUGVDMR8ME3b9tWyHJIqBQeIBsXlJzPb6pNlrbAEceLtNCqDr5z4KbyZjfBbtWttMZgXbF3Ot+XwIec8ePNIfGBJ39Fp4E+XHU7MudFVDFuHZuaVPSNbuKsEnB76UWMPDC+wALnlKJynxAdKTqc6xdBVaLDq1MN6x6IEsLXKKsbRu7xKOLYvpiGqVlmzOJ+SguWACuOjf2pKOomXoCz8A3cT97kOmr0uRZF7QGt3y3ldpr9RpVFwbc1SVJN8BdKb9K26ladZNDJqCNWZ77dmgsQpTo5bpyCxrBTtFOOVqPXooHXsrt/BxR1M5YmubNNpCGhwe8tjiXqiTEq+uMiuSMdOYTDLuRfdsbydY5W0p7KjOy45bKiltoMqzcx+yMeqaMP+xgAyehsGL3CWTA/Y5jE6lZW/mO4UwAYCtCfTiEtD3hvqeJYknCUWuN6e/S1sMjJZFemulZfJUzLsgzWGixWjaivvvHFauElqjcvHmUMhXcO9np','__VIEWSTATEGENERATOR':'BE0801A4','__VIEWSTATEENCRYPTED':'','__EVENTVALIDATION':'rbDl0RTKplkFxNDeWOZ6Fylvg08yxqofFn3G8GuJVrnGuoD+2c1q5tFY17dnAzlR2DxpvvGBeUZ5KIBcKGmHZiPOyMfcYQ/GpDi9sijJ08x9nAgynX/kgXjw7/su4tmCCUzUM1RB/I8IAi5t7nBUyi4T3VY=','rblFind':'STUDENT','LastName':'','FirstName':'Ben','MiddleName':''}
soup = BeautifulSoup(requests.post('https://webapps.davidson.edu/Directories/Public/directory_public.aspx').text)
print soup