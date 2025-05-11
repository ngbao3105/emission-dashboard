import {
  ColorSet,
  Container,
  Graphics,
  Label,
  ListTemplate,
  Percent,
  RadialLabel,
  SerialChart,
  Series,
  Slice,
  Tick,
  cos,
  getAngle,
  getArcBounds,
  mergeBounds,
  mergeTags,
  normalizeAngle,
  p100,
  p50,
  percent,
  relativeToValue,
  setColor,
  sin,
  tan,
  visualSettings
} from "./chunk-BIIHTRLN.js";
import {
  Template,
  Theme,
  each,
  isNumber
} from "./chunk-GNTNZEXX.js";
import {
  __awaiter
} from "./chunk-OTNMZIEQ.js";
import "./chunk-XWLXMCJQ.js";

// node_modules/@amcharts/amcharts5/.internal/charts/percent/PercentDefaultTheme.js
var PercentDefaultTheme = class extends Theme {
  setupDefaultRules() {
    super.setupDefaultRules();
    const ic = this._root.interfaceColors;
    const r = this.rule.bind(this);
    r("PercentSeries").setAll({
      legendLabelText: "{category}",
      legendValueText: "{valuePercentTotal.formatNumber('0.00p')}",
      colors: ColorSet.new(this._root, {}),
      width: p100,
      height: p100
    });
    r("PieChart").setAll({
      radius: percent(80),
      startAngle: -90,
      endAngle: 270
    });
    r("PieSeries").setAll({
      alignLabels: true,
      startAngle: -90,
      endAngle: 270
    });
    r("PieSeries").states.create("hidden", {
      endAngle: -90,
      opacity: 0
    });
    r("Slice", ["pie"]).setAll({
      position: "absolute",
      isMeasured: false,
      x: 0,
      y: 0,
      toggleKey: "active",
      tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00p')}",
      strokeWidth: 1,
      strokeOpacity: 1,
      role: "figure",
      lineJoin: "round"
    });
    r("Slice", ["pie"]).states.create("active", {
      shiftRadius: 20,
      scale: 1
    });
    r("Slice", ["pie"]).states.create("hoverActive", {
      scale: 1.04
    });
    r("Slice", ["pie"]).states.create("hover", {
      scale: 1.04
    });
    r("RadialLabel", ["pie"]).setAll({
      textType: "aligned",
      radius: 10,
      text: "{category}: {valuePercentTotal.formatNumber('0.00p')}",
      paddingTop: 5,
      paddingBottom: 5,
      populateText: true
    });
    r("Tick", ["pie"]).setAll({
      location: 1
    });
    r("SlicedChart").setAll({
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10
    });
    r("FunnelSeries").setAll({
      startLocation: 0,
      endLocation: 1,
      orientation: "vertical",
      alignLabels: true,
      sequencedInterpolation: true
    });
    r("FunnelSlice").setAll({
      interactive: true,
      expandDistance: 0
      //tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00p')}"
    });
    r("FunnelSlice").states.create("hover", {
      expandDistance: 0.15
    });
    r("Label", ["funnel"]).setAll({
      populateText: true,
      text: "{category}: {valuePercentTotal.formatNumber('0.00p')}",
      centerY: p50
    });
    r("Label", ["funnel", "horizontal"]).setAll({
      centerX: 0,
      centerY: p50,
      rotation: -90
    });
    r("Label", ["funnel", "vertical"]).setAll({
      centerY: p50,
      centerX: 0
    });
    r("Tick", ["funnel"]).setAll({
      location: 1
    });
    r("FunnelSlice", ["funnel", "link"]).setAll({
      fillOpacity: 0.5,
      strokeOpacity: 0,
      expandDistance: -0.1
    });
    r("FunnelSlice", ["funnel", "link", "vertical"]).setAll({
      height: 10
    });
    r("FunnelSlice", ["funnel", "link", "horizontal"]).setAll({
      width: 10
    });
    r("PyramidSeries").setAll({
      valueIs: "area"
    });
    r("FunnelSlice", ["pyramid", "link"]).setAll({
      fillOpacity: 0.5
    });
    r("FunnelSlice", ["pyramid", "link", "vertical"]).setAll({
      height: 0
    });
    r("FunnelSlice", ["pyramid", "link", "horizontal"]).setAll({
      width: 0
    });
    r("FunnelSlice", ["pyramid"]).setAll({
      interactive: true,
      expandDistance: 0
    });
    r("FunnelSlice", ["pyramid"]).states.create("hover", {
      expandDistance: 0.15
    });
    r("Label", ["pyramid"]).setAll({
      populateText: true,
      text: "{category}: {valuePercentTotal.formatNumber('0.00p')}",
      centerY: p50
    });
    r("Label", ["pyramid", "horizontal"]).setAll({
      centerX: 0,
      centerY: p50,
      rotation: -90
    });
    r("Label", ["pyramid", "vertical"]).setAll({
      centerY: p50,
      centerX: 0
    });
    r("Tick", ["pyramid"]).setAll({
      location: 1
    });
    r("FunnelSlice", ["pictorial"]).setAll({
      interactive: true,
      tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00p')}"
    });
    r("Label", ["pictorial"]).setAll({
      populateText: true,
      text: "{category}: {valuePercentTotal.formatNumber('0.00p')}",
      centerY: p50
    });
    r("Label", ["pictorial", "horizontal"]).setAll({
      centerX: 0,
      centerY: p50,
      rotation: -90
    });
    r("Label", ["pictorial", "vertical"]).setAll({
      centerY: p50,
      centerX: 0
    });
    r("FunnelSlice", ["pictorial", "link"]).setAll({
      fillOpacity: 0.5,
      width: 0,
      height: 0
    });
    r("Tick", ["pictorial"]).setAll({
      location: 0.5
    });
    {
      const rule = r("Graphics", ["pictorial", "background"]);
      rule.setAll({
        fillOpacity: 0.2
      });
      setColor(rule, "fill", ic, "alternativeBackground");
    }
  }
};

// node_modules/@amcharts/amcharts5/.internal/charts/percent/PercentChart.js
var PercentChart = class extends SerialChart {
  _afterNew() {
    this._defaultThemes.push(PercentDefaultTheme.new(this._root));
    super._afterNew();
    this.chartContainer.children.push(this.seriesContainer);
    this.seriesContainer.children.push(this.bulletsContainer);
  }
  _processSeries(series) {
    super._processSeries(series);
    this.seriesContainer.children.moveValue(this.bulletsContainer, this.seriesContainer.children.length - 1);
  }
};
Object.defineProperty(PercentChart, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "PercentChart"
});
Object.defineProperty(PercentChart, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: SerialChart.classNames.concat([PercentChart.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/percent/PercentSeries.js
var PercentSeries = class extends Series {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "slicesContainer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.children.push(Container.new(this._root, {
        position: "absolute",
        isMeasured: false
      }))
    });
    Object.defineProperty(this, "labelsContainer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.children.push(Container.new(this._root, {
        position: "absolute",
        isMeasured: false
      }))
    });
    Object.defineProperty(this, "ticksContainer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.children.push(Container.new(this._root, {
        position: "absolute",
        isMeasured: false
      }))
    });
    Object.defineProperty(this, "_lLabels", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "_rLabels", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "_hLabels", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "slices", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.addDisposer(this._makeSlices())
    });
    Object.defineProperty(this, "labels", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.addDisposer(this._makeLabels())
    });
    Object.defineProperty(this, "ticks", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.addDisposer(this._makeTicks())
    });
  }
  /**
   * @ignore
   */
  makeSlice(dataItem) {
    const slice = this.slicesContainer.children.push(this.slices.make());
    slice.on("fill", () => {
      this.updateLegendMarker(dataItem);
    });
    slice.on("fillPattern", () => {
      this.updateLegendMarker(dataItem);
    });
    slice.on("stroke", () => {
      this.updateLegendMarker(dataItem);
    });
    slice._setDataItem(dataItem);
    dataItem.set("slice", slice);
    this.slices.push(slice);
    return slice;
  }
  /**
   * @ignore
   */
  makeLabel(dataItem) {
    const label = this.labelsContainer.children.push(this.labels.make());
    label._setDataItem(dataItem);
    dataItem.set("label", label);
    this.labels.push(label);
    return label;
  }
  _shouldMakeBullet(dataItem) {
    if (dataItem.get("value") != null) {
      return true;
    }
    return false;
  }
  /**
   * @ignore
   */
  makeTick(dataItem) {
    const tick = this.ticksContainer.children.push(this.ticks.make());
    tick._setDataItem(dataItem);
    dataItem.set("tick", tick);
    this.ticks.push(tick);
    return tick;
  }
  _afterNew() {
    this.fields.push("category", "fill");
    super._afterNew();
  }
  _onDataClear() {
    const colors = this.get("colors");
    if (colors) {
      colors.reset();
    }
    const patterns = this.get("patterns");
    if (patterns) {
      patterns.reset();
    }
  }
  _prepareChildren() {
    super._prepareChildren();
    this._lLabels = [];
    this._rLabels = [];
    this._hLabels = [];
    if (this._valuesDirty) {
      let sum = 0;
      let absSum = 0;
      let valueHigh = 0;
      let valueLow = Infinity;
      let count = 0;
      each(this._dataItems, (dataItem) => {
        let valueWorking = dataItem.get("valueWorking", 0);
        sum += valueWorking;
        absSum += Math.abs(valueWorking);
      });
      each(this._dataItems, (dataItem) => {
        let value = dataItem.get("valueWorking", 0);
        if (value > valueHigh) {
          valueHigh = value;
        }
        if (value < valueLow) {
          valueLow = value;
        }
        count++;
        let percentTotal = value / absSum;
        if (absSum == 0) {
          percentTotal = 0;
        }
        dataItem.setRaw("valuePercentTotal", percentTotal * 100);
      });
      this.setPrivateRaw("valueLow", valueLow);
      this.setPrivateRaw("valueHigh", valueHigh);
      this.setPrivateRaw("valueSum", sum);
      this.setPrivateRaw("valueAverage", sum / count);
      this.setPrivateRaw("valueAbsoluteSum", absSum);
    }
  }
  /**
   * Shows hidden series.
   *
   * @param   duration  Animation duration in milliseconds
   * @return            Animation promise
   */
  show(duration) {
    const _super = Object.create(null, {
      show: {
        get: () => super.show
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      let promises = [];
      promises.push(_super.show.call(this, duration));
      promises.push(this._sequencedShowHide(true, duration));
      yield Promise.all(promises);
    });
  }
  /**
   * Hide whole series.
   *
   * @param   duration  Animation duration in milliseconds
   * @return            Animation promise
   */
  hide(duration) {
    const _super = Object.create(null, {
      hide: {
        get: () => super.hide
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      let promises = [];
      promises.push(_super.hide.call(this, duration));
      promises.push(this._sequencedShowHide(false, duration));
      yield Promise.all(promises);
    });
  }
  /**
   * @ignore
   */
  _updateChildren() {
    super._updateChildren();
    if (this._valuesDirty) {
      each(this._dataItems, (dataItem) => {
        dataItem.get("label").text.markDirtyText();
      });
    }
    if (this.isDirty("legendLabelText") || this.isDirty("legendValueText")) {
      each(this._dataItems, (dataItem) => {
        this.updateLegendValue(dataItem);
      });
    }
    this._arrange();
  }
  _arrange() {
    this._arrangeDown(this._lLabels);
    this._arrangeUp(this._lLabels);
    this._arrangeDown(this._rLabels);
    this._arrangeUp(this._rLabels);
    this._arrangeLeft(this._hLabels);
    this._arrangeRight(this._hLabels);
    each(this.dataItems, (dataItem) => {
      this._updateTick(dataItem);
    });
  }
  _afterChanged() {
    super._afterChanged();
    this._arrange();
  }
  processDataItem(dataItem) {
    super.processDataItem(dataItem);
    if (dataItem.get("fill") == null) {
      let colors = this.get("colors");
      if (colors) {
        dataItem.setRaw("fill", colors.next());
      }
    }
    if (dataItem.get("fillPattern") == null) {
      let patterns = this.get("patterns");
      if (patterns) {
        dataItem.setRaw("fillPattern", patterns.next());
      }
    }
  }
  /**
   * Shows series's data item.
   *
   * @param   dataItem  Data item
   * @param   duration  Animation duration in milliseconds
   * @return            Promise
   */
  showDataItem(dataItem, duration) {
    const _super = Object.create(null, {
      showDataItem: {
        get: () => super.showDataItem
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      const promises = [_super.showDataItem.call(this, dataItem, duration)];
      if (!isNumber(duration)) {
        duration = this.get("stateAnimationDuration", 0);
      }
      const easing = this.get("stateAnimationEasing");
      let value = dataItem.get("value");
      const animation = dataItem.animate({
        key: "valueWorking",
        to: value,
        duration,
        easing
      });
      if (animation) {
        promises.push(animation.waitForStop());
      }
      const tick = dataItem.get("tick");
      if (tick) {
        promises.push(tick.show(duration));
      }
      const label = dataItem.get("label");
      if (label) {
        promises.push(label.show(duration));
      }
      const slice = dataItem.get("slice");
      if (slice) {
        promises.push(slice.show(duration));
      }
      if (slice.get("active")) {
        slice.states.applyAnimate("active");
      }
      yield Promise.all(promises);
    });
  }
  /**
   * Hides series's data item.
   *
   * @param   dataItem  Data item
   * @param   duration  Animation duration in milliseconds
   * @return            Promise
   */
  hideDataItem(dataItem, duration) {
    const _super = Object.create(null, {
      hideDataItem: {
        get: () => super.hideDataItem
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      const promises = [_super.hideDataItem.call(this, dataItem, duration)];
      const hiddenState = this.states.create("hidden", {});
      if (!isNumber(duration)) {
        duration = hiddenState.get("stateAnimationDuration", this.get("stateAnimationDuration", 0));
      }
      const easing = hiddenState.get("stateAnimationEasing", this.get("stateAnimationEasing"));
      const animation = dataItem.animate({
        key: "valueWorking",
        to: 0,
        duration,
        easing
      });
      if (animation) {
        promises.push(animation.waitForStop());
      }
      const tick = dataItem.get("tick");
      if (tick) {
        promises.push(tick.hide(duration));
      }
      const label = dataItem.get("label");
      if (label) {
        promises.push(label.hide(duration));
      }
      const slice = dataItem.get("slice");
      slice.hideTooltip();
      if (slice) {
        promises.push(slice.hide(duration));
      }
      yield Promise.all(promises);
    });
  }
  /**
   * @ignore
   */
  disposeDataItem(dataItem) {
    super.disposeDataItem(dataItem);
    let label = dataItem.get("label");
    if (label) {
      this.labels.removeValue(label);
      label.dispose();
    }
    let tick = dataItem.get("tick");
    if (tick) {
      this.ticks.removeValue(tick);
      tick.dispose();
    }
    let slice = dataItem.get("slice");
    if (slice) {
      this.slices.removeValue(slice);
      slice.dispose();
    }
  }
  /**
   * Triggers hover on a series data item.
   *
   * @since 5.0.7
   * @param  dataItem  Target data item
   */
  hoverDataItem(dataItem) {
    const slice = dataItem.get("slice");
    if (slice && !slice.isHidden()) {
      slice.hover();
    }
  }
  /**
   * Triggers un-hover on a series data item.
   *
   * @since 5.0.7
   * @param  dataItem  Target data item
   */
  unhoverDataItem(dataItem) {
    const slice = dataItem.get("slice");
    if (slice) {
      slice.unhover();
    }
  }
  /**
   * @ignore
   */
  updateLegendMarker(dataItem) {
    if (dataItem) {
      const slice = dataItem.get("slice");
      if (slice) {
        const legendDataItem = dataItem.get("legendDataItem");
        if (legendDataItem) {
          const markerRectangle = legendDataItem.get("markerRectangle");
          each(visualSettings, (setting) => {
            if (slice.get(setting) != null) {
              markerRectangle.set(setting, slice.get(setting));
            }
          });
        }
      }
    }
  }
  _arrangeDown(labels) {
    if (labels) {
      let next = this._getNextDown();
      labels.sort((a, b) => {
        if (a.y > b.y) {
          return 1;
        } else if (a.y < b.y) {
          return -1;
        } else {
          return 0;
        }
      });
      each(labels, (l) => {
        const bounds = l.label.adjustedLocalBounds();
        let labelTop = bounds.top;
        if (l.y + labelTop < next) {
          l.y = next - labelTop;
        }
        l.label.set("y", l.y);
        next = l.y + bounds.bottom;
      });
    }
  }
  _getNextUp() {
    return this.labelsContainer.maxHeight();
  }
  _getNextDown() {
    return 0;
  }
  _arrangeUp(labels) {
    if (labels) {
      let next = this._getNextUp();
      labels.sort((a, b) => {
        if (a.y < b.y) {
          return 1;
        } else if (a.y > b.y) {
          return -1;
        } else {
          return 0;
        }
      });
      each(labels, (l) => {
        const bounds = l.label.adjustedLocalBounds();
        let labelBottom = bounds.bottom;
        if (l.y + labelBottom > next) {
          l.y = next - labelBottom;
        }
        l.label.set("y", l.y);
        next = l.y + bounds.top;
      });
    }
  }
  _arrangeRight(labels) {
    if (labels) {
      let next = 0;
      labels.sort((a, b) => {
        if (a.y > b.y) {
          return 1;
        } else if (a.y < b.y) {
          return -1;
        } else {
          return 0;
        }
      });
      each(labels, (l) => {
        const bounds = l.label.adjustedLocalBounds();
        let labelLeft = bounds.left;
        if (l.y + labelLeft < next) {
          l.y = next - labelLeft;
        }
        l.label.set("x", l.y);
        next = l.y + bounds.right;
      });
    }
  }
  _arrangeLeft(labels) {
    if (labels) {
      let next = this.labelsContainer.maxWidth();
      labels.sort((a, b) => {
        if (a.y < b.y) {
          return 1;
        } else if (a.y > b.y) {
          return -1;
        } else {
          return 0;
        }
      });
      each(labels, (l) => {
        const bounds = l.label.adjustedLocalBounds();
        let labelRight = bounds.right;
        if (l.y + labelRight > next) {
          l.y = next - labelRight;
        }
        l.label.set("x", l.y);
        next = l.y + bounds.left;
      });
    }
  }
  _updateSize() {
    super._updateSize();
    this.markDirty();
  }
  _updateTick(_dataItem) {
  }
  _dispose() {
    super._dispose();
    const chart = this.chart;
    if (chart) {
      chart.series.removeValue(this);
    }
  }
};
Object.defineProperty(PercentSeries, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "PercentSeries"
});
Object.defineProperty(PercentSeries, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: Series.classNames.concat([PercentSeries.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/pie/PieChart.js
var PieChart = class extends PercentChart {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "_maxRadius", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
  }
  _afterNew() {
    super._afterNew();
    this.seriesContainer.setAll({
      x: p50,
      y: p50
    });
  }
  _prepareChildren() {
    super._prepareChildren();
    const chartContainer = this.chartContainer;
    const w = chartContainer.innerWidth();
    const h = chartContainer.innerHeight();
    const startAngle = this.get("startAngle", 0);
    const endAngle = this.get("endAngle", 0);
    const innerRadius = this.get("innerRadius");
    let bounds = getArcBounds(0, 0, startAngle, endAngle, 1);
    const wr = w / (bounds.right - bounds.left);
    const hr = h / (bounds.bottom - bounds.top);
    let innerBounds = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    if (innerRadius instanceof Percent) {
      let value = innerRadius.value;
      let mr = Math.min(wr, hr);
      value = Math.max(mr * value, mr - Math.min(h, w)) / mr;
      innerBounds = getArcBounds(0, 0, startAngle, endAngle, value);
      this.setPrivateRaw("irModifyer", value / innerRadius.value);
    }
    bounds = mergeBounds([bounds, innerBounds]);
    const prevRadius = this._maxRadius;
    this._maxRadius = Math.min(wr, hr);
    const radius = relativeToValue(this.get("radius", 0), this._maxRadius);
    this.seriesContainer.setAll({
      dy: -radius * (bounds.bottom + bounds.top) / 2,
      dx: -radius * (bounds.right + bounds.left) / 2
    });
    if (this.isDirty("startAngle") || this.isDirty("endAngle") || prevRadius != this._maxRadius) {
      this.series.each((series) => {
        series._markDirtyKey("startAngle");
      });
    }
    if (this.isDirty("innerRadius") || this.isDirty("radius")) {
      this.series.each((series) => {
        series._markDirtyKey("innerRadius");
      });
    }
  }
  /**
   * Returns outer radius in pixels.
   *
   * If optional series parameter is passed in, it will return outer radius
   * of that particular series.
   *
   * @param   series  Series
   * @return          Radius in pixels
   */
  radius(series) {
    let radius = relativeToValue(this.get("radius", 0), this._maxRadius);
    let innerRadius = relativeToValue(this.get("innerRadius", 0), radius);
    if (series) {
      let index = this.series.indexOf(series);
      let length = this.series.length;
      let seriesRadius = series.get("radius");
      if (seriesRadius != null) {
        return innerRadius + relativeToValue(seriesRadius, radius - innerRadius);
      } else {
        return innerRadius + (radius - innerRadius) / length * (index + 1);
      }
    }
    return radius;
  }
  /**
   * Returns inner radius in pixels.
   *
   * If optional series parameter is passed in, it will return inner radius
   * of that particular series.
   *
   * @param   series  Series
   * @return          Radius in pixels
   */
  innerRadius(series) {
    const radius = this.radius();
    let innerRadius = relativeToValue(this.get("innerRadius", 0), radius);
    if (innerRadius < 0) {
      innerRadius = radius + innerRadius;
    }
    if (series) {
      let index = this.series.indexOf(series);
      let length = this.series.length;
      let seriesInnerRadius = series.get("innerRadius");
      if (seriesInnerRadius != null) {
        return innerRadius + relativeToValue(seriesInnerRadius, radius - innerRadius);
      } else {
        return innerRadius + (radius - innerRadius) / length * index;
      }
    }
    return innerRadius;
  }
  _updateSize() {
    super._updateSize();
    this.markDirtyKey("radius");
  }
};
Object.defineProperty(PieChart, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "PieChart"
});
Object.defineProperty(PieChart, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: PercentChart.classNames.concat([PieChart.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/pie/PieSeries.js
var PieSeries = class extends PercentSeries {
  _makeSlices() {
    return new ListTemplate(Template.new({}), () => Slice._new(this._root, {
      themeTags: mergeTags(this.slices.template.get("themeTags", []), ["pie", "series"])
    }, [this.slices.template]));
  }
  _makeLabels() {
    return new ListTemplate(Template.new({}), () => RadialLabel._new(this._root, {
      themeTags: mergeTags(this.labels.template.get("themeTags", []), ["pie", "series"])
    }, [this.labels.template]));
  }
  _makeTicks() {
    return new ListTemplate(Template.new({}), () => Tick._new(this._root, {
      themeTags: mergeTags(this.ticks.template.get("themeTags", []), ["pie", "series"])
    }, [this.ticks.template]));
  }
  processDataItem(dataItem) {
    super.processDataItem(dataItem);
    const slice = this.makeSlice(dataItem);
    slice.on("scale", () => {
      this._updateTick(dataItem);
    });
    slice.on("shiftRadius", () => {
      this._updateTick(dataItem);
    });
    slice.events.on("positionchanged", () => {
      this._updateTick(dataItem);
    });
    const label = this.makeLabel(dataItem);
    label.events.on("positionchanged", () => {
      this._updateTick(dataItem);
    });
    this.makeTick(dataItem);
    slice.events.on("positionchanged", () => {
      label.markDirty();
    });
  }
  _getNextUp() {
    const chart = this.chart;
    if (chart) {
      return chart._maxRadius;
    }
    return this.labelsContainer.maxHeight() / 2;
  }
  _getNextDown() {
    const chart = this.chart;
    if (chart) {
      return -chart._maxRadius;
    }
    return -this.labelsContainer.maxHeight() / 2;
  }
  _prepareChildren() {
    super._prepareChildren();
    const chart = this.chart;
    if (chart) {
      if (this.isDirty("alignLabels")) {
        let labelsTemplate = this.labels.template;
        if (this.get("alignLabels")) {
          labelsTemplate.set("textType", "aligned");
        } else {
          let textType = labelsTemplate.get("textType");
          if (textType == null || textType == "aligned") {
            labelsTemplate.set("textType", "adjusted");
          }
        }
      }
      if (this._valuesDirty || this.isDirty("radius") || this.isDirty("innerRadius") || this.isDirty("startAngle") || this.isDirty("endAngle") || this.isDirty("alignLabels")) {
        this.markDirtyBounds();
        const startAngle = this.get("startAngle", chart.get("startAngle", -90));
        const endAngle = this.get("endAngle", chart.get("endAngle", 270));
        const arc = endAngle - startAngle;
        let currentAngle = startAngle;
        const radius = chart.radius(this);
        this.setPrivateRaw("radius", radius);
        let innerRadius = chart.innerRadius(this) * chart.getPrivate("irModifyer", 1);
        if (innerRadius < 0) {
          innerRadius = radius + innerRadius;
        }
        each(this._dataItems, (dataItem) => {
          this.updateLegendValue(dataItem);
          let currentArc = arc * dataItem.get("valuePercentTotal") / 100;
          const slice = dataItem.get("slice");
          if (slice) {
            slice.set("radius", radius);
            slice.set("innerRadius", innerRadius);
            slice.set("startAngle", currentAngle);
            slice.set("arc", currentArc);
            const color = dataItem.get("fill");
            slice._setDefault("fill", color);
            slice._setDefault("stroke", color);
            const fillPattern = dataItem.get("fillPattern");
            slice._setDefault("fillPattern", fillPattern);
          }
          let middleAngle = normalizeAngle(currentAngle + currentArc / 2);
          const label = dataItem.get("label");
          if (label) {
            label.setPrivate("radius", radius);
            label.setPrivate("innerRadius", innerRadius);
            label.set("labelAngle", middleAngle);
            if (label.get("textType") == "aligned") {
              let labelRadius = radius + label.get("radius", 0);
              let y = radius * sin(middleAngle);
              if (middleAngle > 90 && middleAngle <= 270) {
                if (!label.isHidden() && !label.isHiding()) {
                  this._lLabels.push({
                    label,
                    y
                  });
                }
                labelRadius *= -1;
                labelRadius -= this.labelsContainer.get("paddingLeft", 0);
                label.set("centerX", p100);
                label.setPrivateRaw("left", true);
              } else {
                if (!label.isHidden() && !label.isHiding()) {
                  this._rLabels.push({
                    label,
                    y
                  });
                }
                labelRadius += this.labelsContainer.get("paddingRight", 0);
                label.set("centerX", 0);
                label.setPrivateRaw("left", false);
              }
              label.set("x", labelRadius);
              label.set("y", radius * sin(middleAngle));
            }
          }
          currentAngle += currentArc;
          this._updateTick(dataItem);
        });
      }
    }
  }
  _updateTick(dataItem) {
    const tick = dataItem.get("tick");
    const label = dataItem.get("label");
    const slice = dataItem.get("slice");
    const location = tick.get("location", 1);
    if (tick && label && slice) {
      const radius = (slice.get("shiftRadius", 0) + slice.get("radius", 0)) * slice.get("scale", 1) * location;
      const labelAngle = label.get("labelAngle", 0);
      const cos2 = cos(labelAngle);
      const sin2 = sin(labelAngle);
      const labelsContainer = this.labelsContainer;
      const pl = labelsContainer.get("paddingLeft", 0);
      const pr = labelsContainer.get("paddingRight", 0);
      let x = 0;
      let y = 0;
      x = label.x();
      y = label.y();
      let points = [];
      if (x != 0 || y != 0) {
        if (label.get("textType") == "circular") {
          const labelRadius = label.radius() - label.get("paddingBottom", 0);
          const labelAngle2 = label.get("labelAngle", 0);
          x = labelRadius * cos(labelAngle2);
          y = labelRadius * sin(labelAngle2);
        }
        let dx = -pr;
        if (label.getPrivate("left")) {
          dx = pl;
        }
        points = [{
          x: slice.x() + radius * cos2,
          y: slice.y() + radius * sin2
        }, {
          x: x + dx,
          y
        }, {
          x,
          y
        }];
      }
      tick.set("points", points);
    }
  }
  _positionBullet(bullet) {
    const sprite = bullet.get("sprite");
    if (sprite) {
      const dataItem = sprite.dataItem;
      const slice = dataItem.get("slice");
      if (slice) {
        const innerRadius = slice.get("innerRadius", 0);
        const radius = slice.get("radius", 0);
        const startAngle = slice.get("startAngle", 0);
        const arc = slice.get("arc", 0);
        const locationX = bullet.get("locationX", 0.5);
        const locationY = bullet.get("locationY", 0.5);
        const angle = startAngle + arc * locationX;
        const r = innerRadius + (radius - innerRadius) * locationY;
        sprite.setAll({
          x: cos(angle) * r,
          y: sin(angle) * r
        });
      }
    }
  }
};
Object.defineProperty(PieSeries, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "PieSeries"
});
Object.defineProperty(PieSeries, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: PercentSeries.classNames.concat([PieSeries.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/funnel/FunnelSlice.js
var FunnelSlice = class extends Graphics {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "_projectionDirty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "_tlx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_tly", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_trx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_try", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_blx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_bly", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_brx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_bry", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_cprx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_cplx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_cpry", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_cply", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
  }
  _afterNew() {
    super._afterNew();
    this.set("draw", (display) => {
      const w = this.width();
      const h = this.height();
      let minSide = Math.min(w, h) / 2;
      let crtl = relativeToValue(this.get("cornerRadiusTL", 0), minSide);
      let crtr = relativeToValue(this.get("cornerRadiusTR", 0), minSide);
      let crbr = relativeToValue(this.get("cornerRadiusBR", 0), minSide);
      let crbl = relativeToValue(this.get("cornerRadiusBL", 0), minSide);
      let trX = this._trx;
      let trY = this._try;
      let tlX = this._tlx;
      let tlY = this._tly;
      let brX = this._brx;
      let brY = this._bry;
      let blX = this._blx;
      let blY = this._bly;
      if (trY == tlY) {
        trY = trY - 0.01;
      }
      if (brY == blY) {
        brY = brY - 0.01;
      }
      let tlAngle = getAngle({
        x: tlX,
        y: tlY
      }, {
        x: trX,
        y: trY
      });
      let trAngle = getAngle({
        x: trX,
        y: trY
      }, {
        x: brX,
        y: brY
      });
      let brAngle = getAngle({
        x: brX,
        y: brY
      }, {
        x: blX,
        y: blY
      });
      let blAngle = getAngle({
        x: blX,
        y: blY
      }, {
        x: tlX,
        y: tlY
      });
      if (this.get("orientation") == "horizontal") {
        crtl = Math.min(crtl, Math.abs(tlY - trY) / 2);
        crtr = Math.min(crtr, Math.abs(tlY - trY) / 2);
        crbr = Math.min(crbr, Math.abs(blY - brY) / 2);
        crbl = Math.min(crbl, Math.abs(blY - brY) / 2);
      } else {
        crtl = Math.min(crtl, Math.abs(tlX - trX) / 2);
        crtr = Math.min(crtr, Math.abs(tlX - trX) / 2);
        crbr = Math.min(crbr, Math.abs(blX - brX) / 2);
        crbl = Math.min(crbl, Math.abs(blX - brX) / 2);
      }
      const tlX1 = tlX - crtl * tan((tlAngle - blAngle) / 2) * cos(blAngle);
      const tlY1 = tlY - crtl * tan((tlAngle - blAngle) / 2) * sin(blAngle);
      const tlX2 = tlX - crtl * tan((blAngle - tlAngle) / 2) * cos(tlAngle);
      const tlY2 = tlY - crtl * tan((blAngle - tlAngle) / 2) * sin(tlAngle);
      const trX1 = trX - crtr * tan((trAngle - tlAngle) / 2) * cos(tlAngle);
      const trY1 = trY - crtr * tan((trAngle - tlAngle) / 2) * sin(tlAngle);
      const trX2 = trX - crtr * tan((tlAngle - trAngle) / 2) * cos(trAngle);
      const trY2 = trY - crtr * tan((tlAngle - trAngle) / 2) * sin(trAngle);
      const brX1 = brX - crbr * tan((brAngle - trAngle) / 2) * cos(trAngle);
      const brY1 = brY - crbr * tan((brAngle - trAngle) / 2) * sin(trAngle);
      const brX2 = brX - crbr * tan((trAngle - brAngle) / 2) * cos(brAngle);
      const brY2 = brY - crbr * tan((trAngle - brAngle) / 2) * sin(brAngle);
      const blX1 = blX - crbl * tan((blAngle - brAngle) / 2) * cos(brAngle);
      const blY1 = blY - crbl * tan((blAngle - brAngle) / 2) * sin(brAngle);
      const blX2 = blX - crbl * tan((brAngle - blAngle) / 2) * cos(blAngle);
      const blY2 = blY - crbl * tan((brAngle - blAngle) / 2) * sin(blAngle);
      display.moveTo(tlX2, tlY2);
      display.lineTo(trX1, trY1);
      display.arcTo(trX, trY, trX2, trY2, crtr);
      display.quadraticCurveTo(this._cprx, this._cpry, brX1, brY1);
      display.arcTo(brX, brY, brX2, brY2, crbr);
      display.lineTo(blX1, blY1);
      display.arcTo(blX, blY, blX2, blY2, crbl);
      display.quadraticCurveTo(this._cplx, this._cply, tlX1, tlY1);
      display.arcTo(tlX, tlY, tlX2, tlY2, crtl);
    });
  }
  getPoint(locationX, locationY) {
    let w = this.width();
    let h = this.height();
    const tw = this.get("topWidth", 0);
    const bw = this.get("bottomWidth", 0);
    if (this.get("orientation") == "vertical") {
      let tlx = -tw / 2;
      let trx = tw / 2;
      let brx = bw / 2;
      let blx = -bw / 2;
      let mlx = tlx + (blx - tlx) * locationY;
      let mrx = trx + (brx - trx) * locationY;
      return {
        x: mlx + (mrx - mlx) * locationX,
        y: h * locationY
      };
    } else {
      let tlx = -tw / 2;
      let trx = tw / 2;
      let brx = bw / 2;
      let blx = -bw / 2;
      let mlx = tlx + (blx - tlx) * locationX;
      let mrx = trx + (brx - trx) * locationX;
      return {
        x: w * locationX,
        y: mlx + (mrx - mlx) * locationY
      };
    }
  }
  _changed() {
    if (this.isDirty("topWidth") || this.isDirty("bottomWidth") || this.isDirty("expandDistance") || this.isDirty("orientation") || this.isDirty("width") || this.isDirty("height")) {
      const w = this.width();
      const h = this.height();
      const tw = this.get("topWidth", 0);
      const bw = this.get("bottomWidth", 0);
      this._clear = true;
      let ed = this.get("expandDistance", 0);
      if (this.get("orientation") == "vertical") {
        this._tlx = -tw / 2;
        this._tly = 0;
        this._trx = tw / 2;
        this._try = 0;
        this._brx = bw / 2;
        this._bry = h;
        this._blx = -bw / 2;
        this._bly = h;
        this._cprx = this._trx + (this._brx - this._trx) / 2 + ed * h, this._cpry = this._try + 0.5 * h;
        this._cplx = this._tlx + (this._blx - this._tlx) / 2 - ed * h;
        this._cply = this._tly + 0.5 * h;
      } else {
        this._tly = tw / 2;
        this._tlx = 0;
        this._try = -tw / 2;
        this._trx = 0;
        this._bry = -bw / 2;
        this._brx = w;
        this._bly = bw / 2;
        this._blx = w;
        this._cpry = this._try + (this._bry - this._try) / 2 - ed * w, this._cprx = this._trx + 0.5 * w;
        this._cply = this._tly + (this._bly - this._tly) / 2 + ed * w;
        this._cplx = this._tlx + 0.5 * w;
      }
    }
    super._changed();
  }
};
Object.defineProperty(FunnelSlice, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "FunnelSlice"
});
Object.defineProperty(FunnelSlice, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: Graphics.classNames.concat([FunnelSlice.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/funnel/FunnelSeries.js
var FunnelSeries = class extends PercentSeries {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "_tag", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "funnel"
    });
    Object.defineProperty(this, "links", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.addDisposer(this._makeLinks())
    });
    Object.defineProperty(this, "_total", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_count", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_nextCoord", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_opposite", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
  }
  _makeSlices() {
    return new ListTemplate(Template.new({}), () => FunnelSlice._new(this._root, {
      themeTags: mergeTags(this.slices.template.get("themeTags", []), [this._tag, "series", "slice", this.get("orientation")])
    }, [this.slices.template]));
  }
  _makeLabels() {
    return new ListTemplate(Template.new({}), () => Label._new(this._root, {
      themeTags: mergeTags(this.labels.template.get("themeTags", []), [this._tag, "series", "label", this.get("orientation")])
    }, [this.labels.template]));
  }
  _makeTicks() {
    return new ListTemplate(Template.new({}), () => Tick._new(this._root, {
      themeTags: mergeTags(this.ticks.template.get("themeTags", []), [this._tag, "series", "tick", this.get("orientation")])
    }, [this.ticks.template]));
  }
  _makeLinks() {
    return new ListTemplate(Template.new({}), () => FunnelSlice._new(this._root, {
      themeTags: mergeTags(this.links.template.get("themeTags", []), [this._tag, "series", "link", this.get("orientation")])
    }, [this.links.template]));
  }
  /**
   * @ignore
   */
  makeLink(dataItem) {
    const link = this.slicesContainer.children.push(this.links.make());
    link._setDataItem(dataItem);
    dataItem.set("link", link);
    this.links.push(link);
    return link;
  }
  _afterNew() {
    super._afterNew();
    const slicesContainer = this.slicesContainer;
    slicesContainer.setAll({
      isMeasured: true,
      position: "relative",
      width: percent(100),
      height: percent(100)
    });
    slicesContainer.onPrivate("width", () => {
      this.markDirtySize();
    });
    slicesContainer.onPrivate("height", () => {
      this.markDirtySize();
    });
    if (this.get("orientation") == "vertical") {
      this.set("layout", this._root.horizontalLayout);
    } else {
      this.set("layout", this._root.verticalLayout);
    }
  }
  processDataItem(dataItem) {
    super.processDataItem(dataItem);
    const slice = this.makeSlice(dataItem);
    slice._setDataItem(dataItem);
    dataItem.set("slice", slice);
    this.makeLink(dataItem);
    const label = this.makeLabel(dataItem);
    label.on("x", () => {
      this._updateTick(dataItem);
    });
    label.on("y", () => {
      this._updateTick(dataItem);
    });
    this.makeTick(dataItem);
    slice.events.on("positionchanged", () => {
      label.markDirty();
    });
    slice.events.on("boundschanged", () => {
      const dataItem2 = slice.dataItem;
      if (dataItem2) {
        this._updateTick(dataItem2);
      }
    });
  }
  _updateChildren() {
    this._opposite = false;
    if (this.children.indexOf(this.labelsContainer) == 0) {
      this._opposite = true;
    }
    let total = 0;
    let count = 0;
    each(this.dataItems, (dataItem) => {
      const value = dataItem.get("value");
      if (isNumber(value)) {
        count++;
        if (value > 0) {
          total += Math.abs(dataItem.get("valueWorking", value) / value);
        } else {
          if (this.get("ignoreZeroValues", false)) {
            count--;
          } else {
            if (dataItem.isHidden()) {
              count--;
            } else {
              total += 1;
            }
          }
        }
      }
    });
    this._total = 1 / count * total;
    this._count = count;
    if (this.isDirty("alignLabels")) {
      this._fixLayout();
    }
    if (this._total > 0 && (this._valuesDirty || this._sizeDirty)) {
      const slicesContainer = this.slicesContainer;
      let h;
      if (this.get("orientation") == "vertical") {
        h = slicesContainer.innerHeight();
      } else {
        h = slicesContainer.innerWidth();
      }
      this._nextCoord = this.get("startLocation", 0) * h;
      this.markDirtyBounds();
      let i = 0;
      each(this._dataItems, (dataItem) => {
        this.updateLegendValue(dataItem);
        dataItem.set("index", i);
        i++;
        const slice = dataItem.get("slice");
        const tick = dataItem.get("tick");
        const label = dataItem.get("label");
        const link = dataItem.get("link");
        const color = dataItem.get("fill");
        const fillPattern = dataItem.get("fillPattern");
        slice._setDefault("fill", color);
        slice._setDefault("stroke", color);
        slice._setDefault("fillPattern", fillPattern);
        link._setDefault("fill", color);
        link._setDefault("stroke", color);
        const value = dataItem.get("value");
        if (isNumber(value)) {
          if (value == 0 && this.get("ignoreZeroValues")) {
            slice.setPrivate("visible", false);
            tick.setPrivate("visible", false);
            label.setPrivate("visible", false);
          } else {
            slice.setPrivate("visible", true);
            tick.setPrivate("visible", true);
            label.setPrivate("visible", true);
            this.decorateSlice(dataItem);
            if (this.isLast(dataItem)) {
              link.setPrivate("visible", false);
            } else if (!dataItem.isHidden()) {
              link.setPrivate("visible", true);
            }
          }
        }
      });
    }
    super._updateChildren();
  }
  _fixLayout() {
    const orientation = this.get("orientation");
    const labelsContainer = this.labelsContainer;
    const labelsTemplate = this.labels.template;
    if (this.get("alignLabels")) {
      labelsContainer.set("position", "relative");
      labelsContainer.setAll({
        isMeasured: true
      });
      if (orientation == "vertical") {
        this.set("layout", this._root.horizontalLayout);
        labelsTemplate.setAll({
          centerX: p100,
          x: p100
        });
      } else {
        this.set("layout", this._root.verticalLayout);
        labelsTemplate.setAll({
          centerX: 0,
          x: 0
        });
      }
    } else {
      labelsContainer.setAll({
        isMeasured: false,
        position: "absolute"
      });
      if (orientation == "vertical") {
        labelsContainer.setAll({
          x: p50
        });
        labelsTemplate.setAll({
          centerX: p50,
          x: 0
        });
      } else {
        labelsContainer.setAll({
          y: p50
        });
        labelsTemplate.setAll({
          centerX: p50,
          y: 0
        });
      }
    }
    this.markDirtySize();
  }
  getNextValue(dataItem) {
    let index = dataItem.get("index");
    let nextValue = dataItem.get("valueWorking", 0);
    if (index < this.dataItems.length - 1) {
      let nextItem = this.dataItems[index + 1];
      nextValue = nextItem.get("valueWorking", 0);
      if (nextItem.isHidden() || nextItem.get("value") == 0 && this.get("ignoreZeroValues")) {
        return this.getNextValue(nextItem);
      }
    }
    return nextValue;
  }
  isLast(dataItem) {
    let index = dataItem.get("index");
    if (index == this.dataItems.length - 1) {
      return true;
    } else {
      for (let i = index + 1; i < this.dataItems.length; i++) {
        if (!this.dataItems[i].isHidden()) {
          return false;
        }
      }
    }
    return true;
  }
  decorateSlice(dataItem) {
    const orientation = this.get("orientation");
    const slice = dataItem.get("slice");
    const label = dataItem.get("label");
    const link = dataItem.get("link");
    const slicesContainer = this.slicesContainer;
    let maxWidth = slicesContainer.innerWidth();
    let maxHeight = slicesContainer.innerHeight();
    let maxSize = maxWidth;
    if (orientation == "horizontal") {
      maxSize = maxHeight;
    }
    const nextValue = this.getNextValue(dataItem);
    const value = dataItem.get("value", 0);
    const workingValue = Math.abs(dataItem.get("valueWorking", value));
    const bottomRatio = this.get("bottomRatio", 0);
    const valueHigh = this.getPrivate("valueHigh", 0);
    let d = 1;
    if (value != 0) {
      d = workingValue / Math.abs(value);
    } else {
      if (dataItem.isHidden()) {
        d = 1e-6;
      }
    }
    if (this._nextCoord == Infinity) {
      this._nextCoord = 0;
    }
    let topWidth = workingValue / valueHigh * maxSize;
    let bottomWidth = (workingValue - (workingValue - nextValue) * bottomRatio) / valueHigh * maxSize;
    slice.setAll({
      topWidth,
      bottomWidth,
      orientation
    });
    link.setAll({
      topWidth: bottomWidth,
      bottomWidth: (workingValue - (workingValue - nextValue)) / valueHigh * maxSize,
      orientation
    });
    const startLocation = this.get("startLocation", 0);
    const endLocation = this.get("endLocation", 1);
    if (orientation == "vertical") {
      let linkHeight = link.height() * d;
      maxHeight = maxHeight * (endLocation - startLocation) + linkHeight;
      slice.set("y", this._nextCoord);
      let height = Math.min(1e5, Math.max(0, maxHeight / this._count * d / this._total - linkHeight));
      slice.setAll({
        height,
        x: maxWidth / 2
      });
      let labelY = this._nextCoord + height / 2;
      label.set("y", labelY);
      this._nextCoord += height + linkHeight;
      link.setAll({
        y: this._nextCoord - linkHeight,
        x: maxWidth / 2
      });
    } else {
      let linkHeight = link.width() * d;
      maxWidth = maxWidth * (endLocation - startLocation) + linkHeight;
      slice.set("x", this._nextCoord);
      let width = Math.min(1e5, Math.max(0, maxWidth / this._count * d / this._total - linkHeight));
      slice.setAll({
        width,
        y: maxHeight / 2
      });
      const labelX = this._nextCoord + width / 2;
      label.set("x", labelX);
      this._nextCoord += width + linkHeight;
      link.setAll({
        x: this._nextCoord - linkHeight,
        y: maxHeight / 2
      });
    }
  }
  /**
   * Hides series's data item.
   *
   * @param   dataItem  Data item
   * @param   duration  Animation duration in milliseconds
   * @return            Promise
   */
  hideDataItem(dataItem, duration) {
    const _super = Object.create(null, {
      hideDataItem: {
        get: () => super.hideDataItem
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      dataItem.get("link").hide(duration);
      return _super.hideDataItem.call(this, dataItem, duration);
    });
  }
  /**
   * Shows series's data item.
   *
   * @param   dataItem  Data item
   * @param   duration  Animation duration in milliseconds
   * @return            Promise
   */
  showDataItem(dataItem, duration) {
    const _super = Object.create(null, {
      showDataItem: {
        get: () => super.showDataItem
      }
    });
    return __awaiter(this, void 0, void 0, function* () {
      dataItem.get("link").show(duration);
      return _super.showDataItem.call(this, dataItem, duration);
    });
  }
  _updateTick(dataItem) {
    if (this.get("alignLabels")) {
      const tick = dataItem.get("tick");
      const label = dataItem.get("label");
      const slice = dataItem.get("slice");
      if (tick && slice && label) {
        const labelsContainer = this.labelsContainer;
        const slicesContainer = this.slicesContainer;
        let tickLocation = tick.get("location", 0.5);
        const lcw = labelsContainer.width();
        const lch = labelsContainer.height();
        const pl = labelsContainer.get("paddingLeft", 0);
        const pr = labelsContainer.get("paddingRight", 0);
        const pt = labelsContainer.get("paddingTop", 0);
        const pb = labelsContainer.get("paddingBottom", 0);
        let p0 = {
          x: 0,
          y: 0
        };
        let p1 = {
          x: 0,
          y: 0
        };
        let p2 = {
          x: 0,
          y: 0
        };
        if (this._opposite) {
          tickLocation = 1 - tickLocation;
        }
        if (this.get("orientation") == "vertical") {
          p0 = slice.getPoint(tickLocation, 0.5);
          p0.x += slice.x() + slicesContainer.x();
          p0.y += slice.y() + slicesContainer.y();
          if (this._opposite) {
            p1.x = lcw;
            p1.y = label.y();
            p2.x = lcw - pl;
            p2.y = p1.y;
          } else {
            p1.x = slicesContainer.x() + slicesContainer.width();
            p1.y = label.y();
            p2.x = p1.x + lcw - label.width() - pr;
            p2.y = p1.y;
          }
        } else {
          p0 = slice.getPoint(0.5, tickLocation);
          p0.x += slice.x() + slicesContainer.x();
          p0.y += slice.y() + slicesContainer.y();
          if (this._opposite) {
            p1.y = lch;
            p1.x = label.x();
            p2.y = lch - pt;
            p2.x = p1.x;
          } else {
            p1.y = slicesContainer.y() + slicesContainer.height();
            p1.x = label.x();
            p2.y = p1.y + lch - label.height() - pb;
            p2.x = p1.x;
          }
        }
        tick.set("points", [p0, p1, p2]);
      }
    }
  }
  /**
   * @ignore
   */
  disposeDataItem(dataItem) {
    super.disposeDataItem(dataItem);
    let link = dataItem.get("link");
    if (link) {
      this.links.removeValue(link);
      link.dispose();
    }
  }
  _positionBullet(bullet) {
    const sprite = bullet.get("sprite");
    if (sprite) {
      const dataItem = sprite.dataItem;
      const slice = dataItem.get("slice");
      if (slice) {
        const width = slice.width();
        const height = slice.height();
        const locationX = bullet.get("locationX", 0.5);
        const locationY = bullet.get("locationY", 0.5);
        let dx = 0;
        let dy = 0;
        if (this.get("orientation") == "horizontal") {
          dy = height / 2;
        } else {
          dx = width / 2;
        }
        sprite.setAll({
          x: slice.x() + width * locationX - dx,
          y: slice.y() - dy + height * locationY
        });
      }
    }
  }
};
Object.defineProperty(FunnelSeries, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "FunnelSeries"
});
Object.defineProperty(FunnelSeries, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: PercentSeries.classNames.concat([FunnelSeries.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/funnel/PyramidSeries.js
var PyramidSeries = class extends FunnelSeries {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "_tag", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "pyramid"
    });
    Object.defineProperty(this, "_nextSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
  }
  _prepareChildren() {
    super._prepareChildren();
    this._nextSize = void 0;
  }
  decorateSlice(dataItem) {
    const orientation = this.get("orientation");
    const slicesContainer = this.slicesContainer;
    const slice = dataItem.get("slice");
    const label = dataItem.get("label");
    const link = dataItem.get("link");
    const valueIs = this.get("valueIs", "area");
    const sum = this.getPrivate("valueAbsoluteSum", 0);
    if (sum == 0) {
      return;
    }
    const startLocation = this.get("startLocation", 0);
    const endLocation = this.get("endLocation", 1);
    const tw = this.get("topWidth", 0);
    const bw = this.get("bottomWidth", p100);
    const workingValue = Math.abs(dataItem.get("valueWorking", 0));
    const value = dataItem.get("value", 0);
    let sliceHeight;
    let sliceBottomWidth;
    let pyramidHeight = slicesContainer.innerHeight();
    let pyramidWidth = slicesContainer.innerWidth();
    let linkWidth = link.width();
    let linkHeight = link.height();
    if (orientation == "horizontal") {
      [pyramidWidth, pyramidHeight] = [pyramidHeight, pyramidWidth];
      [linkWidth, linkHeight] = [linkHeight, linkWidth];
    }
    const center = pyramidWidth / 2;
    let d = 1;
    if (value != 0) {
      d = workingValue / Math.abs(value);
    } else {
      if (dataItem.isHidden()) {
        d = 1e-6;
      }
    }
    linkHeight *= d;
    pyramidHeight = pyramidHeight * (endLocation - startLocation) - linkHeight * (this._count * this._total - 1);
    let topWidth = relativeToValue(tw, pyramidWidth);
    if (!isNumber(this._nextSize)) {
      this._nextSize = topWidth;
    }
    let bottomWidth = relativeToValue(bw, pyramidWidth);
    let sliceTopWidth = this._nextSize;
    let angle = Math.atan2(pyramidHeight, topWidth - bottomWidth);
    let c = Math.tan(Math.PI / 2 - angle);
    if (c == 0) {
      c = 1e-8;
    }
    if (valueIs == "area") {
      let totalSquare = (topWidth + bottomWidth) / 2 * pyramidHeight;
      let square = totalSquare * workingValue / sum;
      let s = Math.abs(sliceTopWidth * sliceTopWidth - 2 * square * c);
      sliceHeight = (sliceTopWidth - Math.sqrt(s)) / c;
      if (sliceHeight > 0) {
        sliceBottomWidth = (2 * square - sliceHeight * sliceTopWidth) / sliceHeight;
      } else {
        sliceBottomWidth = sliceTopWidth;
      }
    } else {
      sliceHeight = pyramidHeight * workingValue / sum;
      sliceBottomWidth = sliceTopWidth - sliceHeight * c;
    }
    let labelCoord = this._nextCoord + sliceHeight / 2;
    let sliceX = center;
    let sliceY = this._nextCoord;
    let linkX = center;
    let linkY = sliceY + sliceHeight;
    if (orientation == "vertical") {
      label.set("y", labelCoord);
      if (label.get("opacity") > 0) {
        this._rLabels.push({
          label,
          y: labelCoord
        });
      }
      slice.set("height", sliceHeight);
    } else {
      label.set("x", labelCoord);
      if (label.get("opacity") > 0) {
        this._hLabels.push({
          label,
          y: labelCoord
        });
      }
      [sliceX, sliceY] = [sliceY, sliceX];
      [linkX, linkY] = [linkY, linkX];
      slice.set("width", sliceHeight);
    }
    slice.setAll({
      orientation,
      bottomWidth: sliceBottomWidth,
      topWidth: sliceTopWidth,
      x: sliceX,
      y: sliceY
    });
    link.setAll({
      orientation,
      x: linkX,
      y: linkY,
      topWidth: sliceBottomWidth,
      bottomWidth: sliceBottomWidth
    });
    this._nextSize = sliceBottomWidth;
    this._nextCoord += sliceHeight + linkHeight;
  }
};
Object.defineProperty(PyramidSeries, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "PyramidSeries"
});
Object.defineProperty(PyramidSeries, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: FunnelSeries.classNames.concat([PyramidSeries.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/funnel/PictorialStackedSeries.js
var PictorialStackedSeries = class extends PyramidSeries {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "_tag", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "pictorial"
    });
    Object.defineProperty(this, "seriesMask", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: Graphics.new(this._root, {
        position: "absolute",
        x: p50,
        y: p50,
        centerX: p50,
        centerY: p50
      })
    });
    Object.defineProperty(this, "seriesGraphics", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.slicesContainer.children.push(Graphics.new(this._root, {
        themeTags: ["pictorial", "background"],
        position: "absolute",
        x: p50,
        y: p50,
        centerX: p50,
        centerY: p50
      }))
    });
  }
  _afterNew() {
    super._afterNew();
    this.set("topWidth", p100);
    this.set("bottomWidth", p100);
    this.set("valueIs", "height");
    this.slicesContainer.set("mask", this.seriesMask);
  }
  _updateScale() {
    let slicesContainer = this.slicesContainer;
    let w = slicesContainer.innerWidth();
    let h = slicesContainer.innerHeight();
    let seriesMask = this.seriesMask;
    let seriesGraphics = this.seriesGraphics;
    let scale = seriesMask.get("scale", 1);
    const bounds = seriesMask.localBounds();
    let mw = bounds.right - bounds.left;
    let mh = bounds.bottom - bounds.top;
    if (this.get("orientation") == "horizontal") {
      scale = w / mw;
    } else {
      scale = h / mh;
    }
    if (scale != Infinity && scale != NaN) {
      seriesMask.set("scale", scale);
      seriesMask.set("x", w / 2);
      seriesMask.set("y", h / 2);
      seriesGraphics.set("scale", scale);
      seriesGraphics.set("x", w / 2);
      seriesGraphics.set("y", h / 2);
    }
  }
  _prepareChildren() {
    super._prepareChildren();
    if (this.isDirty("svgPath")) {
      const svgPath = this.get("svgPath");
      this.seriesMask.set("svgPath", svgPath);
      this.seriesGraphics.set("svgPath", svgPath);
    }
    this._updateScale();
  }
};
Object.defineProperty(PictorialStackedSeries, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "PictorialStackedSeries"
});
Object.defineProperty(PictorialStackedSeries, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: PyramidSeries.classNames.concat([PictorialStackedSeries.className])
});

// node_modules/@amcharts/amcharts5/.internal/charts/funnel/SlicedChart.js
var SlicedChart = class extends PercentChart {
  _afterNew() {
    super._afterNew();
    this.seriesContainer.setAll({
      isMeasured: true,
      layout: this._root.horizontalLayout
    });
  }
};
Object.defineProperty(SlicedChart, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "SlicedChart"
});
Object.defineProperty(SlicedChart, "classNames", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: PercentChart.classNames.concat([SlicedChart.className])
});
export {
  PercentDefaultTheme as DefaultTheme,
  FunnelSeries,
  FunnelSlice,
  PercentChart,
  PercentSeries,
  PictorialStackedSeries,
  PieChart,
  PieSeries,
  PyramidSeries,
  SlicedChart
};
//# sourceMappingURL=@amcharts_amcharts5_percent.js.map
