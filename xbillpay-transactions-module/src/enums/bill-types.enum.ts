export enum BillType {
    MTNAirtime = 'MTN Airtime',
    GLOAirtime = 'GLO Airtime',
    MTNData = 'MTN Data',
    GLOData = 'GLO Data',
    DSTV = 'DSTV',
    GOTV = 'GOTV',
    EkoElectricity = 'Eko Electricity',
    JosElectricity = 'Jos Electricity',
  }
  
export  const commissionRates = {
    [BillType.MTNAirtime]: 1.5,
    [BillType.GLOAirtime]: 1.3,
    [BillType.MTNData]: 1.7,
    [BillType.GLOData]: 1.6,
    [BillType.DSTV]: 1.4,
    [BillType.GOTV]: 1.6,
    [BillType.EkoElectricity]: 1.4,
    [BillType.JosElectricity]: 1.8,
  };