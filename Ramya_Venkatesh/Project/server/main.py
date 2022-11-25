from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from flask_cors import CORS
import numpy as np 
from cvxpy import *
import pandas as pd 
import plotly.express as px
import plotly.graph_objects as go
import yfinance as yf
import pandas_datareader.data as web
import pandas_ta as ta
import matplotlib.pyplot as plt
from datetime import date
from newsapi import NewsApiClient
plt.style.use('fivethirtyeight')
from newsapi import NewsApiClient
# from newsapi.newsapi_client import NewsApiClient
from datetime import date, timedelta, datetime
from nltk.sentiment.vader import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()
pd.set_option('display.max_colwidth',1000)
NEWS_API_KEY = '2adc9646b17746ffbd42e9526c1443e1'
import numpy as np
import pandas as pd
import yfinance as yf
import pandas_datareader.data as web
import pandas_ta as ta
import matplotlib.pyplot as plt
from datetime import date
plt.style.use('fivethirtyeight')
yf.pdr_override()
from datetime import datetime
start_time = datetime.now()

COV=np.matrix([[1.26209813e-06, 1.56329823e-06, 1.16873438e-06, 1.52697258e-06,
         8.57417481e-07, 8.93903559e-07, 1.44408851e-06, 1.16563520e-06,
         1.48658962e-06, 7.89958752e-07, 1.58542863e-06, 1.54887900e-06,
         1.36916150e-06],
        [1.56329823e-06, 2.39574787e-06, 1.27146404e-06, 2.21388484e-06,
         9.08365457e-07, 7.80981035e-07, 1.85362055e-06, 1.43950409e-06,
         1.76846106e-06, 8.02813215e-07, 2.42159906e-06, 2.40013966e-06,
         1.64528148e-06],
        [1.16873438e-06, 1.27146404e-06, 1.78915877e-06, 1.22491596e-06,
         7.53210696e-07, 6.96400949e-07, 1.40204005e-06, 1.18745698e-06,
         1.57264128e-06, 8.15443211e-07, 1.27896162e-06, 1.56511440e-06,
         1.28576242e-06],
        [1.52697258e-06, 2.21388484e-06, 1.22491596e-06, 2.18088714e-06,
         9.02065428e-07, 7.78794991e-07, 1.78854234e-06, 1.34739838e-06,
         1.67211510e-06, 7.63163158e-07, 2.23559665e-06, 2.08838373e-06,
         1.59325409e-06],
        [8.57417481e-07, 9.08365457e-07, 7.53210696e-07, 9.02065428e-07,
         1.19156835e-06, 5.83144890e-07, 9.69319706e-07, 7.79740305e-07,
         9.35430520e-07, 6.46030286e-07, 9.27849191e-07, 9.15089058e-07,
         9.12647571e-07],
        [8.93903559e-07, 7.80981035e-07, 6.96400949e-07, 7.78794991e-07,
         5.83144890e-07, 1.72906045e-06, 7.93624011e-07, 7.49398904e-07,
         9.12950428e-07, 6.24098389e-07, 8.02223977e-07, 6.81886889e-07,
         8.13008828e-07],
        [1.44408851e-06, 1.85362055e-06, 1.40204005e-06, 1.78854234e-06,
         9.69319706e-07, 7.93624011e-07, 3.75392566e-06, 1.89838610e-06,
         2.13861082e-06, 1.10957518e-06, 1.88282084e-06, 2.27408464e-06,
         1.86126599e-06],
        [1.16563520e-06, 1.43950409e-06, 1.18745698e-06, 1.34739838e-06,
         7.79740305e-07, 7.49398904e-07, 1.89838610e-06, 3.30302056e-06,
         1.74227147e-06, 9.28044169e-07, 1.46576573e-06, 1.88657955e-06,
         1.58756413e-06],
        [1.48658962e-06, 1.76846106e-06, 1.57264128e-06, 1.67211510e-06,
         9.35430520e-07, 9.12950428e-07, 2.13861082e-06, 1.74227147e-06,
         3.41743799e-06, 1.18501007e-06, 1.76801598e-06, 2.30348949e-06,
         1.86955785e-06],
        [7.89958752e-07, 8.02813215e-07, 8.15443211e-07, 7.63163158e-07,
         6.46030286e-07, 6.24098389e-07, 1.10957518e-06, 9.28044169e-07,
         1.18501007e-06, 1.83166524e-06, 8.09502810e-07, 1.09950550e-06,
         9.25038453e-07],
        [1.58542863e-06, 2.42159906e-06, 1.27896162e-06, 2.23559665e-06,
         9.27849191e-07, 8.02223977e-07, 1.88282084e-06, 1.46576573e-06,
         1.76801598e-06, 8.09502810e-07, 2.50203251e-06, 2.20441847e-06,
         1.68383643e-06],
        [1.54887900e-06, 2.40013966e-06, 1.56511440e-06, 2.08838373e-06,
         9.15089058e-07, 6.81886889e-07, 2.27408464e-06, 1.88657955e-06,
         2.30348949e-06, 1.09950550e-06, 2.20441847e-06, 4.96109108e-06,
         1.79096037e-06],
        [1.36916150e-06, 1.64528148e-06, 1.28576242e-06, 1.59325409e-06,
         9.12647571e-07, 8.13008828e-07, 1.86126599e-06, 1.58756413e-06,
         1.86955785e-06, 9.25038453e-07, 1.68383643e-06, 1.79096037e-06,
         2.25647109e-06]])

CAPM = pd.read_excel('CAPM.xlsx')
CAPM_EXCESS_RETURN=np.matrix(CAPM['CAPM_EXCESS_RETURN'])

df = pd.read_excel('CLOSE_PRICE.xlsx')
Sector=['Date','NIFTY50','NIFTY_BANK','NIFTY_ENERGY','NIFTY_FINANCIAL_SERVICES','NIFTY_FMCG','NIFTY_IT','NIFTY_REALTY','NIFTY_MEDIA','NIFTY_METAL','NIFTY_PHARMA','NIFTY_PRIVATE_BANK','NIFTY_PSU','NIFTY_AUTO']
sector={}
c=0
for i in Sector:
    
    sector[i] =list(df.iloc[:,c])
  
    c=c+1
Data=pd.DataFrame(sector)


Sector='NIFTY50'
def plot(Sector):
    # fig = px.line(Data, x='Date', y=Sector)
    # fig.show()
    return {
        "data":Data.to_dict('list'),
        "x":'Date',
        "y":Sector
    }


Sec='TATAMOTORS.NS'
def graph_plot(Sec):
    stocksymbols = Sec
    startdate = date(2017,8,4)
    end_date = date.today()
    def getMyPortfolio(stocks = stocksymbols ,start = startdate , end = end_date):
        data = web.get_data_yahoo(stocks , data_source='yahoo' , start = start ,end= end )
        return data
    data = getMyPortfolio(stocksymbols)
    # print(data)
    macd = ta.macd(data['Close'])
    data = pd.concat([data, macd], axis=1).reindex(data.index)
    def MACD_Strategy(df, risk):
        MACD_Buy=[]
        MACD_Sell=[]
        position=False

        for i in range(0, len(df)):
            if df['MACD_12_26_9'][i] > df['MACDs_12_26_9'][i] :
                MACD_Sell.append(np.nan)
                if position ==False:
                    MACD_Buy.append(df['Adj Close'][i])
                    position=True
                else:
                    MACD_Buy.append(np.nan)
            elif df['MACD_12_26_9'][i] < df['MACDs_12_26_9'][i] :
                MACD_Buy.append(np.nan)
                if position == True:
                    MACD_Sell.append(df['Adj Close'][i])
                    position=False
                else:
                    MACD_Sell.append(np.nan)
            elif position == True and df['Adj Close'][i] < MACD_Buy[-1] * (1 - risk):
                MACD_Sell.append(df["Adj Close"][i])
                MACD_Buy.append(np.nan)
                position = False
            elif position == True and df['Adj Close'][i] < df['Adj Close'][i - 1] * (1 - risk):
                MACD_Sell.append(df["Adj Close"][i])
                MACD_Buy.append(np.nan)
                position = False
            else:
                MACD_Buy.append(np.nan)
                MACD_Sell.append(np.nan)

        data['MACD_Buy_Signal_price'] = MACD_Buy
        data['MACD_Sell_Signal_price'] = MACD_Sell
    MACD_strategy = MACD_Strategy(data, 0.025)
    def MACD_color(data):
        MACD_color = []
        for i in range(0, len(data)):
            if data['MACDh_12_26_9'][i] > data['MACDh_12_26_9'][i - 1]:
                MACD_color.append(True)
            else:
                MACD_color.append(False)
        return MACD_color

    data['positive'] = MACD_color(data)

    # plt.rcParams.update({'font.size': 10})
    # fig, ax1 = plt.subplots(figsize=(14,8))
    # fig.suptitle(stocksymbols[0], fontsize=10, backgroundcolor='blue', color='white')
    # ax1 = plt.subplot2grid((14, 8), (0, 0), rowspan=8, colspan=14)
    # ax2 = plt.subplot2grid((14, 12), (10, 0), rowspan=6, colspan=14)
    # ax1.set_ylabel('Price in ')
    # ax1.plot('Adj Close',data=data, label='Close Price', linewidth=0.5, color='blue')
    # ax1.scatter(data.index, data['MACD_Buy_Signal_price'], color='green', marker='^', alpha=1)
    # ax1.scatter(data.index, data['MACD_Sell_Signal_price'], color='red', marker='v', alpha=1)
    # ax1.legend()
    # ax1.grid()
    # ax1.set_xlabel('Date', fontsize=8)

    # ax2.set_ylabel('MACD', fontsize=8)
    # ax2.plot('MACD_12_26_9', data=data, label='MACD', linewidth=0.5, color='blue')
    # ax2.plot('MACDs_12_26_9', data=data, label='signal', linewidth=0.5, color='red')
    # ax2.bar(data.index,'MACDh_12_26_9', data=data, label='Volume', color=data.positive.map({True: 'g', False: 'r'}),width=1,alpha=0.8)
    # ax2.axhline(0, color='black', linewidth=0.5, alpha=0.5)
    # ax2.grid()
    # plt.show()
    data['date'] = pd.to_datetime(data.index,format='%Y%m%d')
    data['year'] = pd.DatetimeIndex(data['date']).year
    data= data.replace(np.nan, 'nan')
    return {
        'data':data.to_dict('list')
    }
    # def losers():
#     import pandas as pd
#     from selenium import webdriver
#     from bs4 import BeautifulSoup
#     urls = 'https://www.moneycontrol.com/stocks/marketstats/bseloser/'
#     driver=webdriver.Chrome('C:\chromedriver.exe')
#     driver.get(urls)
#     soup = BeautifulSoup(driver.page_source, 'lxml')
#     tables = soup.find_all('table')
#     losers = pd.read_html(str(tables))
#     losers= pd.DataFrame(losers[0])
#     b=[]
#     for i in losers['Company Name']:
#         b.append(i.split("Add")[0])
        
#     losers['Company Name']=b
#     losers.drop(losers.columns[[7]], axis=1, inplace=True)
#     losers=losers.head(5)
#     print(losers)
# losers()

# def gainers():
#     import pandas as pd
#     from selenium import webdriver
#     from bs4 import BeautifulSoup
#     urls = 'https://www.moneycontrol.com/stocks/marketstats/bsegainer/'
#     driver=webdriver.Chrome('C:\chromedriver.exe')
#     driver.get(urls)
#     soup = BeautifulSoup(driver.page_source, 'lxml')
#     tables = soup.find_all('table')
#     losers = pd.read_html(str(tables))
#     losers= pd.DataFrame(losers[0])
#     b=[]
#     for i in losers['Company Name']:
#         b.append(i.split("Add")[0])
#     losers['Company Name']=b
#     losers.drop(losers.columns[[7]], axis=1, inplace=True)
#     gainers=losers.head(5)
#     print(gainers)

# gainers()
def table(Sectors):
    print(Sectors)
    newsapi = NewsApiClient(api_key= NEWS_API_KEY)
    keywrd = Sectors
    my_date = date.today() - timedelta(days=1) 
# datetime.strptime('10-Apr-2021','%d-%b-%Y')

    articles = newsapi.get_everything(q = keywrd,
                                          from_param = my_date.isoformat(), 
                                          to = (my_date + timedelta(days = 1)).isoformat(),
                                          language="en",
                                          #sources = ",".join(sources_list),
                                          sort_by="relevancy",
                                          page_size = 100)
    article_content = ''

    date_sentiments = {}
    date_sentiments_list = []
    seen = set()
    for article in articles['articles']:
        if str(article['title']) in seen:
          continue
        else:
          seen.add(str(article['title']))
          article_content = str(article['title']) + '. ' + str(article['description'])      
          sentiment = sia.polarity_scores(article_content)['compound']

          date_sentiments.setdefault(my_date, []).append(sentiment)
          date_sentiments_list.append((sentiment, article['url'],article['title'],article['description']))

    date_sentiments_l = sorted(date_sentiments_list, key=lambda tup: tup[0], reverse = True)   
    sent_list = list(date_sentiments.values())[0]

    table=pd.DataFrame(date_sentiments_list, columns=['Sentiment','URL','Title','Description'])
   
    return(table)
def pieplot(Return,Investment,Sectors):
    n = 13
    l=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    for i in Sectors:
        c=0
        for j in list(CAPM['Sector']):
 
            if i==j:
                l[c]=1
                c=c+1
            else:
                if l[c]!=1:
                    l[c]=0
                c=c+1
 
    r=l*np.array([0.14795492, 0.17145121, 0.14067171, 0.16861749, 0.11638622,
             0.11923246, 0.16215179, 0.14042995, 0.16546726, 0.11112383,
             0.17317758, 0.17032639, 0.15630682])       
 
    x = Variable(n)
 
 
    # The minimum return
    req_return =Return/100
 
 
    C=COV
 
    ret = x.T*r.T
 
 
    risk = quad_form(x, C)
 
    # The core problem definition with the Problem class from CVXPY
    prob = Problem(Minimize(risk), [sum(x)==1, ret >= req_return, x >= 0])
    Values=[]
 
    try:
        prob.solve()
        print ("Optimal portfolio")
        print ("----------------------")
        for s in range(len(CAPM['Sector'])):
           print (" Investment in {} : {}% of the portfolio".format(CAPM['Sector'][s],round(x.value[s],2)))
           Values.append(round(x.value[s],2))
        print ("----------------------")
        print ("Exp ret = {}%".format(round(float(ret.value),2)))
        print ("Expected risk    = {}%".format(round(risk.value**0.5,2)))
        
    except:
        print ("Error")
    Labels=list(CAPM['Sector'])
    Value=[]
    for s in range(len(CAPM['Sector'])):
        Value.append(round(x.value[s],2))
    Value 
    Labels=list(CAPM['Sector'])
    dataa = {'Sector':Labels,
            'Value':Value}
 
 
    dff = pd.DataFrame(dataa)
 
    dff['Sector'] = dff['Sector'].str.replace('_',' ')
    dff['Sector'] = dff['Sector'].str.rstrip()
    alloc = pd.read_excel('alloc.xlsx')
    alloc['Sector']=alloc['Sector'].str.rstrip()
    s=[]
    v=[]
    for i,j in zip( dff['Sector'], dff['Value']):
        for k,l,m in zip( alloc['Sector'], alloc['Securities'],alloc['Avg. Wt - PE and EV/EBIT']):
            if i==k:
                s.append(l)
                v.append(j*m)
 
    final = {'Securities':s,
            'Allocation':v}
 
 
    final = pd.DataFrame(final) 
    end_time = datetime.now()
    print('Duration: {}'.format(end_time - start_time))  
    Expected_Investment_amount= Investment+Investment*(round(float(ret.value),2))
   
   
    
    # return (Return,Investment,Sector)
    return({"labels":Labels, "values":Value, "hole":".5" ,"final":final.to_dict('list'),"expectedReturn":round(float(100*ret.value),2),
    "expectedRisk":round(100*risk.value**0.5,2),"ExpectedInvestmentAmount":Expected_Investment_amount })


# def pieplot(Return,Investment,Sectors):
#     # Selected sectors becomes CAPM['Sectors']    
#     n = len(CAPM['Sector'])
#     x = Variable(n)
#     req_return = Return/100

#     r=np.matrix([[0.14795492, 0.17145121, 0.14067171, 0.16861749, 0.11638622,
#          0.11923246, 0.16215179, 0.14042995, 0.16546726, 0.11112383,
#          0.17317758, 0.17032639, 0.15630682]])
#     C=COV
#     # The return
#     ret = x.T*r.T

#     # The risk in xT.Q.x format
#     risk = quad_form(x, C)

#     # The core problem definition with the Problem class from CVXPY
#     prob = Problem(Minimize(risk), [sum(x)==1, ret >= req_return, x >= 0])
#     Values=[]

#     try:
#         prob.solve()
#         # print ("Optimal portfolio")
#         # print ("----------------------")
#         for s in range(len(CAPM['Sector'])):
#         #    print (" Investment in {} : {}% of the portfolio".format(CAPM['Sector'][s],round(100*x.value[s],2)))
#            Values.append(round(100*x.value[s],2))
#         # print ("----------------------")
#         # print ("Exp ret = {}%".format(round(float(100*ret.value),2)))
#         # print ("Expected risk    = {}%".format(round(100*risk.value**0.5,2)))
#     except:
#         print ("Portfolio cant be managed for the selected Return%. Retry again ")
#     labels=list(CAPM['Sector'])
#     # fig = go.Figure(data=[go.Pie(labels=labels, values=Values, hole=.5)])
#     # fig.show()
    
#     Investment=Investment/100
#     L=(Investment)*np.array(Values)
    
#     Labels=list(CAPM['Sector'])
#     # 
#     Value=[]
#     for s in range(len(CAPM['Sector'])):
#         Value.append(round(x.value[s],2))
#     Value 
#     Labels=list(CAPM['Sector'])
#     dataa = {'Sector':Labels,
#             'Value':Value}
 
 
#     dff = pd.DataFrame(dataa)
#     dff['Sector'] = dff['Sector'].str.replace('_',' ')
#     dff['Sector'] = dff['Sector'].str.rstrip()
#     alloc = pd.read_excel('alloc.xlsx')
#     alloc['Sector']=alloc['Sector'].str.rstrip()
#     df3 = pd.merge(dff,alloc,on=['Sector'])
#     alloc['Sector']=alloc['Sector'].str.rstrip()
#     dff.drop(0, inplace = True)
#     s=[]
#     for k,l in zip(alloc['Sector'],alloc['Avg. Wt - PE and EV/EBIT']):
#         for i,j in zip(dff['Value'],dff['Sector']):
#             if j==k:
#                 s.append(i*l)
#             else:
#                 continue
    
#     alloc['Security_alloc']=s
#     final = {'Securities':alloc['Securities'],
#             'Allocation':alloc['Security_alloc']}
    
    
#     final = pd.DataFrame(final)   
#     final
#   # 
#     data = {'Sector':list(CAPM['Sector']),
#         'Allocation':list(L)}


#     df = pd.DataFrame(data)
     
#     # print("Your investment distribution is:")  
#     # print(df)
    
#     # return (Return,Investment,Sector)
#     return({"labels":labels, "values":Values, "hole":".5" ,"final":final.to_dict('list'),"expectedReturn":round(float(100*ret.value),2),
#     "expectedRisk":round(100*risk.value**0.5,2) })
# graph_plot('TATAMOTORS.NS')
# plot('NIFTY50')  
# table('SBI')
# pieplot(10,1000,'all')
app = Flask(__name__)
CORS(app)
@app.route('/api/lineplot', methods=['POST'])
def get_lineplot():
    try:
        if request.method == 'POST':
            """ Get the list of available sample sound files """
            my_abst = request.get_json()
            print(my_abst)
            option=my_abst['Sector_option']
            response = jsonify(plot(option) )
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response   
    except Exception as error:
        return jsonify({
            "statusCode": 500,
            "status": "Could not make prediction",
            "error": str(error)
        }) 

@app.route('/api/graphplot', methods=['POST'])
def get_graphplot():
    try:
        if request.method == 'POST':
            """ Get the list of available sample sound files """
            my_abst = request.get_json()
            option=my_abst['Security']
            # print(my_abst)
            response = jsonify(graph_plot(option) )
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response   
    except Exception as error:
        return jsonify({
            "statusCode": 500,
            "status": "Could not make prediction",
            "error": str(error)
        }) 
@app.route('/api/pieplot', methods=['POST'])
def get_pieplot():
    try:
        if request.method == 'POST':
            """ Get the list of available sample sound files """
            my_abst = request.get_json()
            print(my_abst)
            pieplotValues=pieplot(int(my_abst['returnPercent']),int(my_abst['investmentAmount']),my_abst['secOptions'])
            response = jsonify(pieplotValues)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response   
    except Exception as error:
        return jsonify({
            "statusCode": 500,
            "status": "Could not make prediction",
            "error": str(error)
        }) 

@app.route('/api/table', methods=['POST'])
def get_table():
    try:
        if request.method == 'POST':
            """ Get the list of available sample sound files """
            my_abst = request.get_json()
            option=my_abst['Newss']
            # print(my_abst)
            response = jsonify(table(option).to_dict('list'))
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response   
    except Exception as error:
        return jsonify({
            "statusCode": 500,
            "status": "Could not make prediction",
            "error": str(error)
        }) 


if __name__ == '__main__':
   app.run()