import { defineAsyncComponent } from "vue";

export default {
  DefaultFooter: defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-default-footer" */ "@/components/DefaultFooter.vue"
    ),
  ),
  DefaultHeader: defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-default-header" */ "@/components/DefaultHeader.vue"
    ),
  ),
  DefaultNavigation: defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-default-navigation" */ "@/components/DefaultNavigation.vue"
    ),
  ),
  DefaultSidebar: defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-default-sidebar" */ "@/components/DefaultSidebar.vue"
    ),
  ),
  DefaultPage: defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-default-page" */ "@/components/DefaultPage.vue"
    ),
  ),
  CustomTable: defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-custom-table" */ "@/components/CustomTable.vue"
    ),
  ),
  Pagination : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-pagination" */ "@/components/Pagination.vue"
    ),
  ),
  Loading : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-loading" */ "@/components/helper/Loading.vue"
    ),
  ),
  TableRowUser : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-table-row-user" */ "@/components/table-row/TableRowUser.vue"
    ),
  ),
  TableRowRole : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-table-row-role" */ "@/components/table-row/TableRowRole.vue"
    ),
  ),
  CustomInput : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-custom-input" */ "@/components/input/CustomInput.vue"
    ),
  ),
  CustomButton : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-custom-button" */ "@/components/button/CustomButton.vue"
    ),
  ),
  CardDashboard : defineAsyncComponent(() =>
    import(
      /* webpackChunkName: "c-card-dashboard" */ "@/components/CardDashboard.vue"
    ),
  ),
};
