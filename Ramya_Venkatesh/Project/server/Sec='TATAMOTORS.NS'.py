Sec='TATAMOTORS.NS'
def graph_plot(Sec):
    stocksymbols = Sec
    startdate = date(2017,8,4)
    end_date = date.today()
    def getMyPortfolio(stocks = stocksymbols ,start = startdate , end = end_date):
        data = web.get_data_yahoo(stocks , data_source='yahoo' , start = start ,end= end )
        return data
    data = getMyPortfolio(stocksymbols)
    return(data)
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
graph_plot(Sec)
