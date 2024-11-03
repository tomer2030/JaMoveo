class InstrumentModel {
    public instrumentId: number;
    public instrument: string;

    public constructor(instrument: InstrumentModel) {
        this.instrumentId = instrument.instrumentId;
        this.instrument = instrument.instrument;
    }
}

export default InstrumentModel;