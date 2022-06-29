<template>
  <div>
    <v-sheet height="64">
      <v-toolbar flat>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          Latest Bookings
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :type="type"
        :start="startDate"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="setEvents"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-icon class="mr-4" right @click="selectedOpen = false">
              mdi-close
            </v-icon>
            <v-toolbar-title
            >
            {{`${selectedEvent.name} - ${new Date(selectedEvent.start).toDateString()}`}}
            </v-toolbar-title>
            
          </v-toolbar>
          <v-card-text>
            <p><b>Email: </b><a :href="'mailto:' + selectedEvent.email">{{selectedEvent.email}}</a></p>
            <AppDownloadBtn class="float-right mt-n10" :items="selectedEventOrders.items" :columns="excelColumns" :fileName="`${selectedEvent.name} - ${new Date(selectedEvent.start).toDateString()}`"/>
            <AppTable :items="selectedEventOrders.items" :headers="ordersTableHeaders" />
          </v-card-text>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},  
    selectedEventOrders: {},
    ordersTableHeaders: [
      {text: 'id', value: 'id'},
      {text: 'name', value: 'name'},
      {text: 'price', value: 'price'},
      {text: 'quantity', value: 'quantity'},
    ],
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    excelColumns: [
      {
        label: "id",
        field: "id",
      },
      {
        label: "name",
        field: "name",
      },
      {
        label: "Price",
        field: "price",
      },
      {
        label: "Quantity",
        field: "quantity",
      },
    ],
  }),
  props: ["items"],
  computed: {
    //setting the latest date in the event to intially display the calendar at
    startDate() { 
      const visitedTimes = this.items.map((v) => new Date(v.visited).getTime());
      return visitedTimes.sort((a, b) => a - b)[visitedTimes.length - 1];
    },
  },
  methods: {
    setEvents() {
      const events = [];
      for (let i = 0; i < this.items.length; i++) {
        events.push({
          name: `${this.items[i].first_name} ${this.items[i].last_name}`,
          last_name: this.items[i].last_name,
          start: this.items[i].visited,
          end: new Date(new Date(this.items[i].visited).getTime()).addHours(2),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: 1,
          email: this.items[i].email,
          gender: this.items[i].gender,
          id: this.items[i].id,
        });
      }
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    showEvent({ nativeEvent, event }) {
      const open = async () => {
        //get order details
        let orders = await this.$axios.$get(
          `/exam.guests.orders?guest_id=${event.id}`
        );
        this.selectedEvent = event;
        this.selectedEventOrders = orders;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
  created() {
    Date.prototype.addHours = function (h) {
      this.setHours(this.getHours() + h);
      return this;
    };
  },
};
</script>