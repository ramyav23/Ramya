import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Card, Container, Row, Col, Table, Form } from "react-bootstrap";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [currentStatus, setCurrentStatus] = useState("login");
  const [users, setUsers] = useState([
    {
      userName: "demo",
      email: "demo@gmail.com",
      password: "demo",
    },
  ]);
  const [linePlotData, setLinePlotData] = useState({ data: {}, x: "", y: "" });
  const [tableData, setTableData] = useState({});
  const [piePlotData, setPiePlotData] = useState({});
  const [graphPlotData, setGraphPlotData] = useState({ data: {} });
  const [showDropdown, setshowDropdown] = useState(false);
  const [Sector_option, setSector_option] = useState("NIFTY50");
  const [Security, setSecurity] = useState("TATAMOTORS.NS");
  const [Newss, setNews] = useState("SBI");
  const Sector_options = [
    "NIFTY50",
    "NIFTY_BANK",
    "NIFTY_ENERGY",
    "NIFTY_FINANCIAL_SERVICES",
    "NIFTY_FMCG",
    "NIFTY_IT",
    "NIFTY_REALTY",
    "NIFTY_MEDIA",
    "NIFTY_METAL",
    "NIFTY_PHARMA",
    "NIFTY_PRIVATE_BANK",
    "NIFTY_PSU",
    "NIFTY_AUTO",
  ];

  const [multiSector_options, setmultiSector_options] = useState({
    NIFTY50: true,
    NIFTY_BANK: true,
    NIFTY_ENERGY: true,
    NIFTY_FINANCIAL_SERVICES: true,
    NIFTY_FMCG: true,
    NIFTY_IT: true,
    NIFTY_REALTY: true,
    NIFTY_MEDIA: true,
    NIFTY_METAL: true,
    NIFTY_PHARMA: true,
    NIFTY_PRIVATE_BANK: true,
    NIFTY_PSU: true,
    NIFTY_AUTO: true,
  });

  const signupHandle = (signupData) => {
    if (!signupData) {
      return;
    }
    console.log(signupData);
    let data = [...users];
    data.push(signupData);
    setUsers(data);
    setCurrentStatus("login");
  };

  const LogoutHandle = () => {
    setCurrentStatus("login");
  };

  const News = [
    "KOTAK",
    "HDFC",
    "INDUSINDBK",
    "PNB",
    "FEDERAL",
    "IDFCFIRSTB",
    "BARODA",
    "SBIN",
    "ICICI",
    "BANDHAN",
    "AXIS BANK",
    "AUBANK",
    "RELIANCE",
    "NTPC",
    "TATA POWER",
    "GAIL",
    "ONGC",
    "Power Grid Corporation",
    "ADANI ",
    "BPCL",
    "IOC",
    "ADANI GREEN",
    "SBI CARDs",
    "HDFC",
    "Power Finance Corporation",
    "KOTAK",
    "Shriram Transport Finance ",
    "HDFC",
    "ICICI Lombard",
    "REC",
    "HDFC LIFE",
    "Icici Prudential Life Insurance",
    "HDFCAMC",
    "Piramal Enterprises ",
    "Cholamandalam Investment ",
    "SBIN",
    "ICICI",
    "Sbi Life Insurance Company",
    "AXIS ",
    "MUTHOOT",
    "Bajaj Finserv",
    "BAJ FINANCE",
    "RADICO",
    "Colgate-Palmolive",
    "Procter & Gamble Hygiene & Health Care",
    "United Breweries",
    "Godrej Consumer",
    "Nestle India",
    "Dabur India",
    "MARICO",
    "Hindustan Unilever",
    "ITC",
    "Britannia Industries",
    "United Spirits",
    "Emami",
    "Tata Consumer Products",
    "Varun Beverages",
    "Larsen & Toubro Infotech",
    "Tata Consultancy Services",
    "L&T Technology Services",
    "Coforge",
    "MPHASIS",
    "HCL Technologies",
    "Tech Mahindra",
    "Infosys",
    "WIPRO",
    "MINDTREE",
    "BRIGADE",
    "PRESTIGE",
    "LODHA",
    "Oberoi Realty",
    "Phoenix Mills",
    "Godrej Properties",
    "DLF",
    "SOBHA",
    "Indiabulls Real Estate",
    "Sunteck Realty",
    "TV18 Broadcast",
    "PVR",
    "Hathway Cable and Datacom",
    "INOX Leisure",
    "Dish TV ",
    "Network 18 Media & Investments ",
    "Saregama India",
    "Sun TV",
    "Nazara Technologies",
    "Zee Entertainment Enterprises",
    "Jindal Steel & Power",
    "JSW Steel",
    "NMDC",
    "Tata SteelL",
    "Vedanta",
    "Ratnamani Metals and Tubes",
    "Hindustan Copper",
    "Steel Authority of India",
    "Hindustan Zinc",
    "Adani Enterprises",
    "Hindalco Industries",
    "Apl Apollo Tubes",
    "National Aluminium Company",
    "Jindal Stainless",
    "Welspun Corp",
    "Gland Pharma",
    "Alembic Pharmaceuticals",
    "Alkem Laboratories",
    "BIOCON",
    "Natco Pharma",
    "Glenmark Pharmaceuticals",
    "IPCA Laboratories",
    "CIPLA",
    "Abbott India",
    "Sun Pharmaceutical Industries",
    "Torrent Pharmaceuticals ",
    "LAURUS LABS",
    "Granules India",
    "Zydus Lifesciences",
    "Divi's Laboratories",
    "PFIZER",
    "Aurobindo Pharma",
    "\nStrides Pharma Science ",
    "Dr Reddy's Laboratories",
    "LUPIN",
    "HDFC BANK",
    "INDUSIND",
    "KOTAK BANK",
    "City Union Bank",
    "FEDERAL BANK",
    "IDFC FIRST BANK",
    "BANDHAN BANK",
    "RBL BANK",
    "AXIS",
    "ICICI",
    "CENTRAL BANK",
    "UCO BANK",
    "Punjab and Sind Bank",
    "Indian Overseas Bank",
    "BANK INDIA",
    "Indian Bank",
    "BANK BARODA",
    "Punjab National Bank",
    "Bank of Maharashtra",
    "UNION BANK",
    "Canara Bank",
    "SBI",
    "Hero Motocorp",
    "Balkrishna Industries",
    "MRF",
    "TVS MOTOR",
    "BAJAJ AUTO",
    "Eicher Motors",
    "Mahindra & Mahindra",
    "ESCORTS",
    "BOSCH",
    "BHARAT FORG",
    "ASHOKLEY",
    "TATA MOTORS",
    "MARUTI",
    "Tube Investments",
    "Sona Blw Precision Forgings",
  ];
  const Securities = [
    "KOTAKBANK.NS",
    "HDFCBANK.NS",
    "INDUSINDBK.NS",
    "PNB.NS",
    "FEDERALBNK.NS",
    "IDFCFIRSTB.NS",
    "BANKBARODA.NS",
    "SBIN.NS",
    "ICICIBANK.NS",
    "BANDHANBNK.NS",
    "AXISBANK.NS",
    "AUBANK.NS",
    "RELIANCE.NS",
    "NTPC.NS",
    "TATAPOWER.NS",
    "GAIL.NS",
    "ONGC.NS",
    "POWERGRID.NS",
    "ADANITRANS.NS",
    "BPCL.NS",
    "IOC.NS",
    "ADANIGREEN.NS",
    "SBICARD.NS",
    "HDFCBANK.NS",
    "PFC.NS",
    "KOTAKBANK.NS",
    "SRTRANSFIN.NS",
    "HDFC.NS",
    "ICICIGI.NS",
    "RECLTD.NS",
    "HDFCLIFE.NS",
    "ICICIPRULI.NS",
    "HDFCAMC.NS",
    "PEL.NS",
    "CHOLAFIN.NS",
    "SBIN.NS",
    "ICICIBANK.NS",
    "SBILIFE.NS",
    "AXISBANK.NS",
    "MUTHOOTFIN.NS",
    "BAJAJFINSV.NS",
    "BAJFINANCE.NS",
    "RADICO.NS",
    "COLPAL.NS",
    "PGHH.NS",
    "UBL.NS",
    "GODREJCP.NS",
    "NESTLEIND.NS",
    "DABUR.NS",
    "MARICO.NS",
    "HINDUNILVR.NS",
    "ITC.NS",
    "BRITANNIA.NS",
    "MCDOWELL-N.NS",
    "EMAMILTD.NS",
    "TATACONSUM.NS",
    "VBL.NS",
    "LTI.NS",
    "TCS.NS",
    "LTTS.NS",
    "COFORGE.NS",
    "MPHASIS.NS",
    "HCLTECH.NS",
    "TECHM.NS",
    "INFY.NS",
    "WIPRO.NS",
    "MINDTREE.NS",
    "BRIGADE.NS",
    "PRESTIGE.NS",
    "LODHA.NS",
    "OBEROIRLTY.NS",
    "PHOENIXLTD.NS",
    "GODREJPROP.NS",
    "DLF.NS",
    "SOBHA.NS",
    "IBREALEST.NS",
    "SUNTECK.NS",
    "TV18BRDCST.NS",
    "PVR.NS",
    "HATHWAY.NS",
    "INOXLEISUR.NS",
    "DISHTV.NS",
    "NETWORK18.NS",
    "SAREGAMA.NS",
    "SUNTV.NS",
    "NAZARA.NS",
    "ZEEL.NS",
    "JINDALSTEL.NS",
    "JSWSTEEL.NS",
    "NMDC.NS",
    "TATASTEEL.NS",
    "VEDL.NS",
    "RATNAMANI.NS",
    "HINDCOPPER.NS",
    "SAIL.NS",
    "HINDZINC.NS",
    "ADANIENT.NS",
    "HINDALCO.NS",
    "APLAPOLLO.NS",
    "NATIONALUM.NS",
    "JSLHISAR.NS",
    "WELCORP.NS",
    "GLAND.NS",
    "APLLTD.NS",
    "ALKEM.NS",
    "BIOCON.NS",
    "NATCOPHARM.NS",
    "GLENMARK.NS",
    "IPCALAB.NS",
    "CIPLA.NS",
    "ABBOTINDIA.NS",
    "SUNPHARMA.NS",
    "TORNTPHARM.NS",
    "LAURUSLABS.NS",
    "GRANULES.NS",
    "ZYDUSLIFE.NS",
    "DIVISLAB.NS",
    "PFIZER.NS",
    "AUROPHARMA.NS",
    "STAR.NS",
    "DRREDDY.NS",
    "LUPIN.NS",
    "HDFCBANK.NS",
    "INDUSINDBK.NS",
    "KOTAKBANK.NS",
    "CUB.NS",
    "FEDERALBNK.NS",
    "IDFCFIRSTB.NS",
    "BANDHANBNK.NS",
    "RBLBANK.NS",
    "AXISBANK.NS",
    "ICICIBANK.NS",
    "CENTRALBK.NS",
    "UCOBANK.NS",
    "PSB.NS",
    "IOB.NS",
    "BANKINDIA.NS",
    "INDIANB.NS",
    "BANKBARODA.NS",
    "PNB.NS",
    "MAHABANK.NS",
    "UNIONBANK.NS",
    "CANBK.NS",
    "SBIN.NS",
    "HEROMOTOCO.NS",
    "BALKRISIND.NS",
    "MRF.NS",
    "TVSMOTOR.NS",
    "BAJAJ-AUTO.NS",
    "EICHERMOT.NS",
    "M&M.NS",
    "ESCORTS.NS",
    "BOSCHLTD.NS",
    "BHARATFORG.NS",
    "ASHOKLEY.NS",
    "TATAMOTORS.NS",
    "MARUTI.NS",
    "TIINDIA.NS",
    "SONACOMS.NS",
  ];

  const [pieplotOptions, setPiePlotOptions] = useState({
    investmentAmount: 1000,
    returnPercent: 10,
    secOptions: Sector_options,
  });

  const getLinePlotData = () => {
    axios
      .post(`http://127.0.0.1:5000/api/lineplot`, {
        Sector_option,
      })
      .then(({ data }) => {
        setLinePlotData(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getTableData = () => {
    axios
      .post(`http://127.0.0.1:5000/api/table`, {
        Newss,
      })
      .then(({ data }) => {
        // console.log(data);
        setTableData(data);
      });
  };
  const getGraphPlotData = () => {
    axios
      .post(`http://127.0.0.1:5000/api/graphplot`, {
        Security,
      })
      .then(({ data }) => {
        setGraphPlotData(data);
      });
  };
  const getPiePlotData = () => {
    axios
      .post(`http://127.0.0.1:5000/api/pieplot`, pieplotOptions)
      .then(({ data }) => {
        setPiePlotData(data);
      });
  };
  useEffect(() => {
    getLinePlotData();
  }, [Sector_option]);
  useEffect(() => {
    getTableData();
  }, [Newss]);
  useEffect(() => {
    getPiePlotData();
  }, [pieplotOptions]);
  useEffect(() => {
    getGraphPlotData();
  }, [Security]);

  return (
    <div className="App">
      <h3 className="heading-text">Stock Portfolio Analytics</h3>
      <Container fluid className="app-container">
        <div>
          {currentStatus === "signup" && (
            <Signup
              signupHandle={signupHandle}
              setCurrentStatus={setCurrentStatus}
            />
          )}
          {currentStatus === "login" && (
            <Login users={users} setCurrentStatus={setCurrentStatus} />
          )}

          {currentStatus === "home" && (
            <>
              <div>
                <button className="logout" onClick={LogoutHandle}>
                  Log Out
                </button>
              </div>
              <Row>
                <Col>
                  <Card body>
                    {linePlotData && (
                      <>
                        <Plot
                          data={[
                            {
                              x: linePlotData["data"][linePlotData.x],
                              y: linePlotData["data"][linePlotData.y],
                              type: "scatter",
                              mode: "lines+markers",
                              marker: { color: "red" },
                            },
                          ]}
                          layout={{
                            width: 1200,
                            height: 600,
                            title: "Sector Trend",
                          }}
                        />

                        <Form.Select
                          aria-label="Default select example"
                          className="custom-select"
                          onChange={(e) => setSector_option(e.target.value)}
                        >
                          <option>Open this select menu</option>

                          {Sector_options.map((option, index) => (
                            <option key={option + index} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card body>
                    <Card body>
                      {graphPlotData && (
                        <>
                          <Plot
                            data={[
                              {
                                x: graphPlotData["data"]["date"],
                                y: graphPlotData["data"]["Close"],
                                type: "scatter",
                                mode: "lines",
                                name: "Closed Price",

                                line: {
                                  color: "rgb(128, 0, 128)",
                                  width: 1,
                                },
                              },
                              {
                                x: graphPlotData["data"]["date"],
                                y: graphPlotData["data"][
                                  "MACD_Buy_Signal_price"
                                ],
                                type: "scatter",
                                mode: "lines+markers",
                                name: "MACD_Buy_Signal_price",
                                marker: { color: "green" },
                              },
                              {
                                x: graphPlotData["data"]["date"],
                                y: graphPlotData["data"][
                                  "MACD_Sell_Signal_price"
                                ],
                                type: "scatter",
                                mode: "lines+markers",
                                marker: { color: "red" },
                                name: "MACD_Sell_Signal_price",
                              },
                            ]}
                            layout={{
                              width: 1200,
                              height: 600,
                              title: "Securities Trend",
                            }}
                          />
                          <Plot
                            data={[
                              {
                                x: graphPlotData["data"]["date"],
                                y: graphPlotData["data"]["MACD_12_26_9"],
                                type: "scatter",
                                mode: "lines",
                                line: {
                                  color: "blue",
                                  width: 1,
                                },
                                name: "MACD",
                              },
                              {
                                x: graphPlotData["data"]["date"],
                                y: graphPlotData["data"]["MACDs_12_26_9"],
                                type: "scatter",
                                mode: "lines",
                                line: {
                                  color: "red",
                                  width: 1,
                                },
                                name: "Signal",
                              },
                              {
                                x: graphPlotData["data"]["date"],
                                y: graphPlotData["data"]["MACDh_12_26_9"],
                                type: "bar",
                                marker: { color: "red" },
                                name: "Volume",
                              },
                            ]}
                            layout={{ width: 1200, height: 600 }}
                          />
                          <Form.Select
                            aria-label="Default select example"
                            className="custom-select"
                            onChange={(e) => setSecurity(e.target.value)}
                          >
                            <option>Open this select menu</option>

                            {Securities.map((option, index) => (
                              <option key={option + index} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                        </>
                      )}
                    </Card>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Sentiment</th>
                          <th>Description</th>
                          <th>URL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData &&
                          tableData["Description"] &&
                          tableData["Description"].map((col, index) => (
                            <tr key={col}>
                              <td>{index + 1}</td>
                              <td>{tableData["Title"][index]}</td>
                              <td>{tableData["Sentiment"][index]}</td>
                              <td>{tableData["Description"][index]}</td>
                              <td>{tableData["URL"][index]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <Form.Select
                      aria-label="Default select example"
                      className="custom-select"
                      onChange={(e) => setNews(e.target.value)}
                    >
                      <option>Open this select menu</option>

                      {News.map((option, index) => (
                        <option key={option + index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card body>
                    {piePlotData && (
                      <>
                        <Plot
                          data={[
                            {
                              values: piePlotData.values,
                              labels: piePlotData.labels,
                              type: "pie",
                              hole: piePlotData.hole,
                            },
                          ]}
                          layout={{
                            width: 600,
                            height: 608,
                            title: "Pie Plot",
                          }}
                        />
                        <div className="pieform-container">
                          <Row>
                            <Col>
                              <Form.Label htmlFor="investmentAmount">
                                Investment Amount
                              </Form.Label>
                              <Form.Control
                                type="number"
                                id="investmentAmount"
                                aria-describedby="investmentAmount"
                                value={pieplotOptions.investmentAmount}
                                name="investmentAmount"
                                onChange={(e) => {
                                  setPiePlotOptions((pie) => ({
                                    ...pie,
                                    [e.target.name]: parseInt(e.target.value),
                                  }));
                                }}
                              />{" "}
                            </Col>
                            <Col>
                              <>
                                <Form.Label>
                                  Return Percentage:{" "}
                                  {pieplotOptions.returnPercent}%{" "}
                                </Form.Label>
                                <Form.Range
                                  value={pieplotOptions.returnPercent}
                                  name="returnPercent"
                                  onChange={(e) => {
                                    setPiePlotOptions((pie) => ({
                                      ...pie,
                                      [e.target.name]: parseInt(e.target.value),
                                    }));
                                  }}
                                />
                              </>{" "}
                            </Col>
                            <Col>
                              <Form.Label htmlFor="investmentAmount">
                                Sector Options
                              </Form.Label>
                              <div className="multi-select-container">
                                <div className="input-container">
                                  <div className="input-content">
                                    {Sector_options.map(
                                      (sec) =>
                                        multiSector_options[sec] && (
                                          <span key={sec}> {sec} </span>
                                        )
                                    )}
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      paddingLeft: "10px",
                                      color: "black",
                                    }}
                                    onClick={() => {
                                      setshowDropdown((isShow) => !isShow);
                                    }}
                                  >
                                    {showDropdown ? (
                                      <i className="arrow up"></i>
                                    ) : (
                                      <i className="arrow down"></i>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className={`${
                                    showDropdown ? "dropdown-container" : "hide"
                                  } `}
                                >
                                  {Sector_options.map((sec) => (
                                    <div key={sec} className="dropdown-content">
                                      <Form.Check
                                        type="checkbox"
                                        defaultChecked={
                                          multiSector_options[sec]
                                        }
                                        name={sec}
                                        label={sec}
                                        onClick={(e) => {
                                          console.log(
                                            e.target.name,
                                            e.target.checked
                                          );
                                          const secopt = Sector_options.map(
                                            (sec) => {
                                              if (
                                                multiSector_options[sec] &&
                                                sec !== e.target.name
                                              ) {
                                                return sec;
                                              }
                                              if (
                                                multiSector_options[sec] &&
                                                sec === e.target.name &&
                                                e.target.checked
                                              ) {
                                                return sec;
                                              }
                                              return;
                                            }
                                          ).filter((ele) => ele);

                                          setPiePlotOptions((pie) => ({
                                            ...pie,
                                            secOptions: secopt,
                                          }));
                                          setmultiSector_options((secOp) => ({
                                            ...secOp,
                                            [e.target.name]: e.target.checked,
                                          }));
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <div className="pie-text">
                            <Row>
                              <Col>
                                {" "}
                                <Form.Label>
                                  Expected Investment Amount
                                </Form.Label>
                                <div>
                                  {piePlotData.ExpectedInvestmentAmount}
                                </div>
                              </Col>
                              <Col>
                                {" "}
                                <Form.Label>Expected Return</Form.Label>
                                <div>{piePlotData.expectedReturn}</div>
                              </Col>

                              <Col>
                                {" "}
                                <Form.Label>Expected Risk</Form.Label>
                                <div>{piePlotData.expectedRisk}</div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                </Col>
                <Col>
                  <Card body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Allocation</th>
                          <th>Securities</th>
                        </tr>
                      </thead>
                      <tbody>
                        {piePlotData &&
                          piePlotData.final &&
                          piePlotData.final["Allocation"] &&
                          piePlotData.final["Allocation"].map((col, index) => (
                            <tr key={col}>
                              <td>{index + 1}</td>
                              <td>{piePlotData.final["Securities"][index]}</td>
                              <td>{piePlotData.final["Allocation"][index]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
