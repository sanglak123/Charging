const { Prices, Banks, TypeCards } = require("../../db/models");
export const DataController = {
    BuyCard: {
        GetFees: async (req, res) => {
            try {
                const List = await PriceBuyCards.findAll();
                return res.status(200).json({ PriceBuyCards: List })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    ChangeCard: {
        GetFees: async (req, res) => {
            try {
                const list = await ListPrices.findAll();
                const VIETTEL = list.filter(card => card.telco === "VIETTEL");
                const VINAPHONE = list.filter(card => card.telco === "VINAPHONE");
                const MOBIFONE = list.filter(card => card.telco === "MOBIFONE");
                const VNMOBI = list.filter(card => card.telco === "VNMOBI");
                const ZING = list.filter(card => card.telco === "ZING");
                const GATE = list.filter(card => card.telco === "GATE");
                const GARENA = list.filter(card => card.telco === "GARENA");
                const VCOIN = list.filter(card => card.telco === "VCOIN");

                const ListCard = [
                    {
                        name: "VIETTEL",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"],
                        list: VIETTEL
                    },
                    {
                        name: "VINAPHONE",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"],
                        list: VINAPHONE
                    },
                    {
                        name: "VNMOBI",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"],
                        list: VNMOBI
                    },
                    {
                        name: "MOBIFONE",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"],
                        list: MOBIFONE
                    },
                    {
                        name: "ZING",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"],
                        list: ZING
                    },
                    {
                        name: "GATE",
                        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000"],
                        list: GATE
                    },
                    {
                        name: "GARENA",
                        value: ["20.000", "50.000", "100.000", "200.000", "500.000"],
                        list: GARENA
                    },
                    {
                        name: "VCOIN",
                        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"],
                        list: VCOIN
                    },
                ]

                return res.status(200).json({ ListPrices: ListCard });
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Banks: {
        GetListBanks: async (req, res) => {
            try {
                const list = await ListBanks.findAll();
                return res.status(200).json({ ListBanks: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    LoadingData: async (req, res) => {
        try {
            //Type Cards
            const typeCards = await TypeCards.findAll();
            //list banks
            const listBank = await Banks.findAll();
            //Prices
            const listPrice = await Prices.findAll({
                include: [{ model: TypeCards }]
            });

            return res.status(200).json({ TypeCards: typeCards, ListBanks: listBank, Prices: listPrice })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}