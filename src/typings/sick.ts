export interface SickProps {
  sickCd: string; //질병 코드
  sickNm: string; //질병 이름
}

export interface SickApiResponse {
  data: SickProps[];
  expired: number;
}
