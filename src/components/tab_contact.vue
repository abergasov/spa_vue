<template>
  <div id="vue_contact" class="wrap container-fluid">
    <section class="page-section">
      <div class="row center-xs">
        <div class="col-xs-12">
          <div class="box">
            <h2 class="text-center conditions_title Polaris-Subheading">Contact us</h2>
          </div>
        </div>
        <div class="col-xs"><div class="box-row"></div></div>
        <div class="col-xs">
          <div class="box-row success_label">
            <polaris-banner v-if="show_ok_label" title="Thanks!" status="success">
              <p>We have received your message.</p>
            </polaris-banner>
          </div>
        </div>
        <div class="col-xs"><div class="box-row"></div></div>

      </div>
      <div class="row justify-content-md-center">
        <div class="col-sm-4 col-xs-offset-4">
          <polaris-form-layout>
            <polaris-text-field v-model="name" label="Name:"></polaris-text-field>
            <polaris-text-field v-model="email" label="E-mail:" type="email"></polaris-text-field>
            <polaris-text-field v-model="message" label="Message" multiline></polaris-text-field>
          </polaris-form-layout>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-sm-4 col-xs-offset-4">
          <button :disabled="this.$store.getters.requesting" @click="sendContact" class="Polaris-Button Polaris-Button--primary contact_btn">
            <span class="Polaris-Button__Content">
                <span>Send</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
        name: "tab_contact",
        data () {
            return {
                show_ok_label: false,
                name: '',
                email: '',
                message: ''
            }
        },
        methods: {
            sendContact: function () {
                let conf = {
                    shop: document.getElementById('shop_name').value,
                    name: this.name,
                    email: this.email,
                    message: this.message,
                    src_contact: this.$store.getters.app,
                    product_count: document.getElementById('product_count').value
                };
                window.ajaxRequest('/contact', conf, (response) => {
                    if (response.data && response.data.ok) {
                        this.show_ok_label = true;
                        this.name = this.email = this.message = '';
                        setTimeout(() => {
                            this.show_ok_label = false;
                        }, 6666);
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .contact_btn {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
  }
  .success_label{
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
