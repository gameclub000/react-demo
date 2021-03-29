import BlockInfo from "./components/BlockInfo";
import BlockTransactions from "./components/BlockTransactions";
import { Layout } from "antd";
import BlockForm from "./components/BlockForm";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <BlockForm />
        <BlockInfo />
        <BlockTransactions />
      </Content>
    </Layout>
  );
}

export default App;
