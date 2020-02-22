<template>
  <div class="order">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @input="queryChange"
            @clear="queryClose"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number" width="200"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === '0'" type="danger">未付款</el-tag>
            <el-tag v-if="scope.row.pay_status === '1'" type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time" width="140">
          <template slot-scope="scope">{{scope.row.create_time | timeFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              :enterable="false"
              content="修改地址"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editOrder(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-button
              type="success"
              icon="el-icon-location-outline"
              size="mini"
              @click="checkLocation(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="queryInfo.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="修改地址" :visible.sync="showEditLocateForm" width="50%">
      <el-form :model="editInfo" :rules="editRules" label-width="90px" ref="addAttrRef">
        <!--是rules不是rule-->
        <el-form-item label="省市县/区" prop="city">
          <el-cascader :options="cityData" v-model="editInfo.detail"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="editInfo.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditLocateForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(editInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物流详情" :visible.sync="showLocation" width="60%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import cityData from "plugins/citydata.js";
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      orderList: [],
      currentPage: 1,
      showEditLocateForm: false,
      editInfo: {
        city: "",
        detail: ""
      },
      editRules: {
        city: [{ required: true, message: "请选择省市县/区", trigger: "blur" }],
        detail: [{ required: true, message: "请输入详细地址", trigger: "blur" }]
      },
      cityData,
      showLocation: false,
      activities: [],
      timer: null
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.$http.get("orders", { params: this.queryInfo }).then(res => {
        //console.log(res)
        if (res.data.meta.status !== 200)
          return this.$message.error("获取订单数据失败");
        this.total = res.data.data.total;
        this.orderList = res.data.data.goods;
      });
    },
    editOrder(order) {
      this.showEditLocateForm = true;
    },
    checkLocation(order) {
      this.$http.get('/kuaidi/1106975712662').then(res => {
        if(res.data.meta.status !== 200)
          return this.$message.error("获取物流信息失败")
        this.activities = res.data.data
      }).catch(err => err)
      this.showLocation = true;
    },
    queryChange(e){
      console.log(e)
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryInfo.query = e
        this.getOrderList()
      }, 1000)
    },
    queryClose(){
      this.queryInfo.query = ''
      //this.getUserList()
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getOrderList();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-cascader {
  width: 100%;
}
</style>
