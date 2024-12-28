import axios from 'axios';

// 타입 정의
export interface GuestbookEntry {
  _id: string;
  guestName: string;
  date: string;
  contents: string;
  isUser: boolean;
}

export interface CreateGuestbookDTO {
  guestName: string;
  contents: string;
  date: string;
  isUser: boolean;
}

class GuestbookModel {
  private readonly BASE_URL = '/api/guestbook';

  // 유효성 검사
  private validateEntry(data: CreateGuestbookDTO): void {
    if (!data.guestName?.trim()) {
      throw new Error('작성자 이름은 필수입니다.');
    }

    if (!data.contents?.trim()) {
      throw new Error('내용을 입력해주세요.');
    }

    if (data.contents.length > 300) {
      throw new Error('내용은 300자를 초과할 수 없습니다.');
    }
  }

  // API 에러 처리
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '서버 오류가 발생했습니다.');
    }
    throw error;
  }

  // 방명록 목록 조회
  async getAllEntries(): Promise<GuestbookEntry[]> {
    try {
      const response = await axios.get<GuestbookEntry[]>(this.BASE_URL);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // 방명록 작성
  async createEntry(data: CreateGuestbookDTO): Promise<GuestbookEntry> {
    try {
      // 유효성 검사
      this.validateEntry(data);

      const response = await axios.post<GuestbookEntry>(this.BASE_URL, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // 방명록 삭제
  async deleteEntry(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error('삭제할 방명록 ID가 필요합니다.');
      }

      await axios.delete(`${this.BASE_URL}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  // 방명록 수정
  async updateEntry(id: string, data: Partial<CreateGuestbookDTO>): Promise<GuestbookEntry> {
    try {
      if (!id) {
        throw new Error('수정할 방명록 ID가 필요합니다.');
      }

      const response = await axios.put<GuestbookEntry>(`${this.BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // 특정 방명록 조회
  async getEntryById(id: string): Promise<GuestbookEntry> {
    try {
      if (!id) {
        throw new Error('조회할 방명록 ID가 필요합니다.');
      }

      const response = await axios.get<GuestbookEntry>(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // 비밀번호 검증 (비회원 작성 글 수정/삭제 시 사용)
  async verifyPassword(id: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.BASE_URL}/verify`, {
        id,
        password
      });
      return response.data.verified;
    } catch (error) {
      this.handleError(error);
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
export const guestbookModel = new GuestbookModel();