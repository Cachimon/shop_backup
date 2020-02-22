<template>
  <div class="goods">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @input="queryChange" @clear="queryClose">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" border stripe class="goods-list-table">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" width="390" prop="goods_name" class="goods-name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{scope.row.add_time | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editGoods(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeGoodsById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="queryInfo.pagesize"
        :page-sizes="[5, 10, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="编辑商品" :visible.sync="showEditForm" width="50%">
      <el-form :model="editInfo" :rules="editRules" label-width="80px" ref="editRef">
        <!--是rules不是rule-->
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editInfo.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editInfo.goods_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editInfo.goods_weight" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(editInfo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      timer: null,
      goodsList: [],
      total: 0,
      currentPage:1,
      showEditForm: false,
      editInfo: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0
      },
      editRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
      }
    };
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList(){
      this.$http.get('goods', {params: this.queryInfo}).then(res => {
        if(res.data.meta.status !== 200)
          return this.$message.error("获取商品列表失败")
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      }).catch(err => err)
    },
    queryChange(e){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryInfo.query = e
        this.getGoodsList()
      }, 1000)
    },
    queryClose(){
      this.queryInfo.query = ''
      //this.getUserList()
    },
    addGoods() {
      this.$router.push('/goods/add')
    },
    editUser(goods){
      this.editInfo.goods_name = goods.goods_name
      this.editInfo.goods_price = goods.goods_price
      this.editInfo.goods_weight = goods.goods_weight
      this.showEditForm = true
    },
    confirmEdit(editInfo){
      this.$refs.editRef.validate(valid => {
        if(!valid) return
      })
    },
    handleSizeChange(val){
      this.queryInfo.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange(val){
      this.queryInfo.pagenum = val
      this.getGoodsList()
    },
    removeGoodsById(goodsId){
       this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`goods/${goodsId}`).then(res => {
            if(res.data.meta.status !== 200)
              return this.$message.error("删除商品失败")
            this.getGoodsList()
            this.$message.success("删除商品成功")
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    editGoods(goods){
      console.log(goods.goods_id)
      this.$router.push(`/goods/edit/${goods.goods_id}`)
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
