<template>
  <div class="graph-container">
    <h2>Visualización del Tangle (IOTA)</h2>
    <div ref="tangleGraph" class="graph"></div>
  </div>
</template>

<script>
import { Network } from "vis-network/standalone";
import AnalyticsService from "@/analytics/services/analyticsService";

export default {
  name: "TransactionGraph",
  data() {
    return {
      graph: null,
      nodes: [],
      edges: [],
      transactions: {}
    };
  },
  mounted() {
    this.fetchTransactionGraph();
  },
  methods: {
    async fetchTransactionGraph() {
      try {
        const response = await AnalyticsService.getTransactionGraph("your-auth-token");
        this.transactions = response.data.transactions;

        this.buildGraphData();
        this.renderGraph();
      } catch (error) {
        console.error("Error al obtener el grafo de transacciones: ", error.message);
      }
    },
    buildGraphData() {
      // Recorrer cada transacción para construir nodos y aristas
      Object.values(this.transactions).forEach((transaction) => {
        // Crear nodos para las wallets y transacciones
        const senderNode = `wallet_${transaction.senderWallet.id}`;
        const receiverNode = `wallet_${transaction.receiverWallet.id}`;
        const transactionNode = `tx_${transaction.hash}`;

        // Agregar nodos de las wallets (evitar duplicados)
        if (!this.nodes.some((node) => node.id === senderNode)) {
          this.nodes.push({
            id: senderNode,
            label: `Wallet ${transaction.senderWallet.id}`,
            color: '#4b9eff',
            shape: 'ellipse',
          });
        }

        if (!this.nodes.some((node) => node.id === receiverNode)) {
          this.nodes.push({
            id: receiverNode,
            label: `Wallet ${transaction.receiverWallet.id}`,
            color: '#ffd466',
            shape: 'ellipse',
          });
        }

        // Agregar nodo de transacción
        this.nodes.push({
          id: transactionNode,
          label: `Tx: ${transaction.amount} coins`,
          color: '#ff8a66',
          shape: 'box',
        });

        // Crear aristas (conexiones) entre wallets y la transacción
        this.edges.push({ from: senderNode, to: transactionNode, label: `Envía ${transaction.amount}` });
        this.edges.push({ from: transactionNode, to: receiverNode, label: `Recibe ${transaction.amount}` });

        // Agregar aristas de las transacciones previas (aprobaciones)
        if (transaction.previousTransactionHash1) {
          this.edges.push({
            from: `tx_${transaction.previousTransactionHash1}`,
            to: transactionNode,
            label: 'Aprobación 1'
          });
        }

        if (transaction.previousTransactionHash2) {
          this.edges.push({
            from: `tx_${transaction.previousTransactionHash2}`,
            to: transactionNode,
            label: 'Aprobación 2'
          });
        }
      });
    },
    renderGraph() {
      const container = this.$refs.tangleGraph;

      const data = {
        nodes: this.nodes,
        edges: this.edges,
      };

      const options = {
        physics: {
          enabled: true,
          solver: "forceAtlas2Based",
        },
        edges: {
          smooth: true,
        },
        interaction: {
          dragNodes: true,
        },
      };

      this.graph = new Network(container, data, options);
    }
  },
};
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 500px;
}

.graph {
  width: 100%;
  height: 100%;
}
</style>
