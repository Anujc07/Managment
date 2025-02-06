import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const RevenueGraph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/issues/").then((response) => {
            const revenueData = response.data.map(issue => ({
                date: new Date(issue.created_at).toLocaleDateString(),
                revenue: issue.total_cost
            }));
            setData(revenueData);
        });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RevenueGraph;
